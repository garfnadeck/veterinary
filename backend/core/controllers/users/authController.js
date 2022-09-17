const User = require("../../models/user/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../../configs/errors");
const { attachCookiesToResponse, createTokenUser } = require("../../../utils");

const registerController = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  if (!email || !firstName || !lastName || !password) {
    throw new CustomError.BadRequestError("Please provide the values");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new CustomError.BadRequestError("User already exist");
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({
    email,
    firstName,
    lastName,
    password,
    role,
  });

  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide e-mail and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }

  const isPwdOk = await user.comparePassword(password);
  if (!isPwdOk) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }

  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json(tokenUser);
};

const logoutController = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "logged out" });
};

module.exports = {
  registerController,
  loginController,
  logoutController,
};
