const mongoose = require("mongoose");

const AnimaliaFamilySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      unique: true,
      trim: true,
    },

    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2016/07/15/15/55/dachshund-1519374_960_720.jpg",
    },

    habitats: {
      type: String,
      enum: ["terrestrial", "aquatic", "aerial"],
      default: "terrestrial",
    },

    diet: {
      type: String,
      enum: ["carnivore", "herbivore", "omnivore", "insectivorous"],
      default: "carnivore",
    },

    reproduction: {
      type: String,
      enum: ["sexual", "asexual"],
      default: "sexual",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AnimaliaFamily", AnimaliaFamilySchema);
