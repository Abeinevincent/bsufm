// Import mongoose ORM
const mongoose = require("mongoose");

// Create user model
const FarmerSpesficsModel = new mongoose.Schema(
  {
    farmerId: {
      type: String,
      required: true,
    },
    farmername: {
      type: String,
      required: true,
    },
    farmerdistrict: {
      type: String,
      required: true,
    },
    itemname: {
      type: String,
      required: true,
    },
    itemquantity: {
      type: Number,
      required: true,
    },
    itemunit: {
      type: String,
      required: true,
    },
    itemstatus: {
      type: String,
      required: true,
    },
    farmerprofileimage: {
      type: String,
    },
  },
  { timestamps: true }
);

// Export this model for import in the routes that will need to use it
module.exports = mongoose.model("FarmerSpesfics", FarmerSpesficsModel);
