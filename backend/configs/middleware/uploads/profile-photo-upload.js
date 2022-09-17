const multer = require("multer");

//storage
const multerStorage = multer.memoryStorage();

//file type

const multerFilter = (req, file, cb) => {
  if (file.mimeType.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};
