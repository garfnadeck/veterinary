const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");
const path = require("path");

const resizeImage = async ({
  file: imageFile,
  id: id,
  width: width,
  heigth: heigth,
}) => {
  await sharp(imageFile)
    .resize(width, heigth)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.join(`tmp/${id}.jpg`));
};

const cloudinaryUpload = async ({ file: fileToUpload, path: path }) => {
  try {
    const data = await cloudinary.uploader.upload(fileToUpload, {
      use_filename: true,
      folder: path,
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
