const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const connectDB = require("./configs/db/connectDB");
require("express-async-errors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const notFoundMiddleware = require("./configs/middleware/not-found");
const errorHandlerMiddleware = require("./configs/middleware/error-handler");

const authRouter = require("./core/routes/user/authRoutes");
const userRouter = require("./core/routes/user/userRoutes");
const animaliaFamilyRouter = require("./core/routes/eukaryota/familyRoutes");
//
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static("./public"));
app.use(fileUpload());

//routes
app.get("/", (req, res) => {
  res.json("hello");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/animaliaFamily", animaliaFamilyRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//server
const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(5000, "0.0.0.0", console.log(`connected to the ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
