const mongoose = require("mongoose");

const CanidaeSchema = new mongoose.Schema({
  breed: {
    type: String,
    required: [true, "Please provide a breed"],
    unique: true,
  },

  image: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2017/09/25/13/12/cocker-spaniel-2785074_960_720.jpg",
  },

  originCountry: {
    type: String,
    required: [true, "Please provide a country"],
  },

  history: {
    type: String,
  },

  size: {
    type: String,
    enum: ["teacup", "toy", "small", "medium", "larger", "giant"],
    default: "small",
  },

  weigth: {
    type: String,
  },

  furColor: {
    type: String,
  },

  typeOfHead: {
    type: String,
    enum: ["mesocephalic", "brachycephalic", "dolichocephalic"],
    default: "mesocephalic",
  },

  group: {
    type: String,
    enum: [
      "Group 1 - Sheepdogs and Cattledogs (except Swiss Cattledogs)",
      "Group 2 - Pinscher and Schnauzer - Molossoid and Swiss Mountain and Cattledogs",
      "Group 3 - Terriers",
      "Group 4 - Dachshunds",
      "Group 5 - Spitz and primitive types",
      "Group 6 - Scent hounds and related breeds ",
      "Group 7 - Pointing Dogs",
      "Group 8 - Retrievers - Flushing Dogs - Water Dogs",
      "Group 9 - Companion and Toy Dogs",
      "Group 10 - Sighthounds",
    ],
  },

  animaliaFamily: {
    type: mongoose.Types.ObjectId,
    ref: "AnimaliaFamily",
    requried: true,
  },
});

module.exports = mongoose.model("Canidae", CanidaeSchema);
