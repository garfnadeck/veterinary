const mongoose = require("mongoose");

const VirusSchema = new mongoose.Schema({
  strand: {
    type: String,
    enum: [
      "dsDNA",
      "ssDNA",
      "Reverse Transcribing",
      "dsRNA",
      "ssRNA(+)",
      "ssRNA(-)",
      "Circular ss RNA",
    ],
    required: [true, "Please provide a strand Type"],
  },
  name: {
    type: String,
    required: [true, "please provide a name"],
  },
  family: {
    type: String,
    required: [true, "please provide a family"],
  },
  genus: {
    type: String,
    required: [true, "please provide a family"],
  },
  etymology: {
    type: String,
    required: [true, "please provide a family"],
  },
  species: {
    type: String,
    required: [true, "please provide a family"],
  },
  host: {
    type: String,
    required: [true, "please provide a family"],
  },
});

module.exports = mongoose.model("Virus", VirusSchema);
