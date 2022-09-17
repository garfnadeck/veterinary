const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");
const path = require("path");

const resizeImage = async ({
  file: imageFile,
  width: width,
  heigth: heigth,
  savePath: savePath,
}) => {
  await sharp(imageFile)
    .resize(width, heigth)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.join(savePath));
};

const cloudinaryUpload = async ({ file: fileToUpload, savePath: savePath }) => {
  try {
    const data = await cloudinary.uploader.upload(fileToUpload, {
      use_filename: true,
      folder: savePath,
    });
    return {
      url: data?.secure_url,
      publicId: data?.public_id,
    };
  } catch (error) {
    console.log(error);
  }
};

const cloudinaryRemoveLastUserImage = async (id) => {
  await cloudinary.uploader.destroy(id);
};

module.exports = {
  resizeImage,
  cloudinaryUpload,
  cloudinaryRemoveLastUserImage,
};
