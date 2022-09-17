const User = require("../../models/user/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../../configs/errors");

const fs = require("fs");
const {
  resizeImage,
  cloudinaryUpload,
  cloudinaryRemoveLastUserImage,
} = require("../../../utils/");
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require("../../../utils");

const getAllUsers = async (req, res) => {
  const user = await User.find({ role: "user" }).select("-password");

  res.status(StatusCodes.OK).json({ user, count: user.length });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");

  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`);
  }

  checkPermissions(req.user, user._id);

  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res) => {
  const { email, firstName, lastName } = req.body;
  if (!email || !firstName || !lastName) {
    throw new CustomError.BadRequestError("Please provide all values");
  }

  const user = await User.findOneAndUpdate({ _id: req.user.userId }, req.body, {
    new: true,
    runValidators: true,
  });

  console.log(req.body);

  // const user = await User.findOne({ _id: req.user.userId });
  // (user.email = email),
  //   (user.firstName = firstName),
  //   (user.lastName = lastName),
  //   (user.profileImage = profileImage),
  //   await user.save();

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please provide both values");
  }

  const user = await User.findOne({ _id: req.user.userId });

  const isPwdOk = await user.comparePassword(oldPassword);

  if (!isPwdOk) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  user.password = newPassword;

  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Password updated" });
};

const deleteUser = async (req, res) => {
  const { id: userId } = req.params;

  const userExists = await User.findOne({ _id: userId });

  if (!userExists) {
    throw new CustomError.BadRequestError(`The user ${userId} not found`);
  }

  checkPermissions(req.user, userExists._id);

  const user = await User.findOneAndDelete({ _id: userId });
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ user });
};

const profileImageUser = async (req, res) => {
  const { userId } = req.user;

  await resizeImage({
    file: req.files.image.data,
    id: userId,
    width: 350,
    heigth: 260,
  });

  const localPath = `tmp/${userId}.jpg`;
  const data = await cloudinaryUpload({
    file: localPath,
    path: `veterinary/user/${userId}/profileImage/`,
  });

  const findUser = await User.findOne({ _id: userId });
  await cloudinaryRemoveLastUserImage(findUser.publicImageId);

  const user = await User.findOneAndUpdate(
    { _id: userId },
    { profileImage: data.url, publicImageId: data.publicId },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  fs.unlinkSync(localPath);
  return res.status(StatusCodes.OK).json({
    Link: user.profileImage,
    public_id: user.publicImageId,
  });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  deleteUser,
  profileImageUser,
};
