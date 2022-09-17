const jwt = require("jsonwebtoken");
const CustomError = require("../errors");
const { isTokenValid } = require("../../utils");

// const auth = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     throw new UnauthenticatedError("Authentication invalid");
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = {
//       userId: payload.userId,
//       name: payload.firstName,
//       role: payload.role,
//     };
//     next();
//   } catch (error) {
//     throw new UnauthenticatedError("Authentication invalid");
//   }
// };

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }

  try {
    const payload = isTokenValid({ token });
    req.user = {
      userId: payload.userId,
      name: payload.firstName,
      role: payload.role,
    };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }
};

// const authorizePermissions = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     throw new CustomError.UnauthorizedError(
//       "Unauthorized to access this route"
//     );
//   }
//   next();
// };
const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
