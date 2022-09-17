const CustomError = require("../configs/errors");

const checkPermissions = (requestUser, resourceUserId) => {
  console.log();
  if (requestUser.role === "admin") return;
  if (requestUser.role === "staff") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new CustomError.UnauthorizedError(
    "Not authorized to access this route"
  );
};

module.exports = checkPermissions;
