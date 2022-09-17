const Family = require("../../models/eukaryota/animalia/Family");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../../configs/errors");

const createFamily = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new CustomError.BadRequestError("Please provide all values");
  }

  const family = await Family.create(req.body);

  res.status(StatusCodes.CREATED).json({ family });
};
const getAllFamilies = async (req, res) => {
  const family = await Family.find({});
  res.status(StatusCodes.OK).json({ family });
};

const getSingleFamily = async (req, res) => {
  const { id: familyId } = req.params;

  const family = await Family.findOne({ _id: familyId });

  if (!family) {
    throw new CustomError.NotFoundError(
      `Family with id: ${familyId} not found`
    );
  }

  res.status(StatusCodes.OK).json({ family });
};

const updateFamily = async (req, res) => {
  const { id: familyId } = req.params;

  const family = await Family.findByIdAndUpdate({ _id: familyId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!family) {
    throw new CustomError.NotFoundError(
      `Family with id: ${familyId} not found`
    );
  }

  res.status(StatusCodes.OK).json({ family });
};

const deleteFamily = async (req, res) => {
  const { id: familyId } = req.params;

  const family = await Family.findOneAndDelete({ _id: familyId });

  if (!family) {
    throw new CustomError.NotFoundError(
      `Family with id: ${familyId} not found`
    );
  }

  res.status(StatusCodes.OK).json({ msg: `Family ${family.name} deleted` });
};

module.exports = {
  createFamily,
  getAllFamilies,
  getSingleFamily,
  updateFamily,
  deleteFamily,
};
