const { createJWT, isTokenValid, attachCookiesToResponse } = require("./jwt");
const createTokenUser = require("./createTokenUser");
const checkPermissions = require("./checkPermissions");
const {
  resizeImage,
  cloudinaryUpload,
  cloudinaryRemoveLastUserImage,
} = require("./resizeAndCloudinary");

module.exports = {
  createJWT,
  isTokenValid,
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
  resizeImage,
  cloudinaryUpload,
  cloudinaryRemoveLastUserImage,
};
