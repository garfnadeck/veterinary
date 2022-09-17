const Canidae = require("../../models/animalia/Canidae");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../../configs/errors");

const createCanidae = async (req, res) => {
  const { breed, originCountry } = req.body;

  if (!breed || !originCountry) {
    throw new CustomError.BadRequestError("Please provide the values");
  }

  const canidae = await Canidae.create(req.body);

  res.status(StatusCodes.OK).json({ canidae });
};
const getAllCanidaes = async (req, res) => {
  res.send("get All canidae");
};
const getSingleCanidae = async (req, res) => {
  res.send("get Single canidae");
};
const updateCanidae = async (req, res) => {
  res.send("update canidae");
};
const deleteCanidae = async (req, res) => {
  res.send("delete canidae");
};

module.exports = {
  createCanidae,
  getAllCanidaes,
  getSingleCanidae,
  updateCanidae,
  deleteCanidae,
};
