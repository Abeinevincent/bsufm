// Import mongoose ORM
const mongoose = require("mongoose");

// Create Farmer model
const FarmerModel = new mongoose.Schema(
  {
    farmerId: {
      type: String,
      required: true,
    },
    buyerId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Export this model for import in the routes that will need to use it
module.exports = mongoose.model("Farmer", FarmerModel);
