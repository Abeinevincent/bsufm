// Import mongoose ORM
const mongoose = require("mongoose");

// Create Farmer model
const FarmerModel = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phonenumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    subcounty: {
      type: String,
    },
    profileimage: {
      type: String,
      default: "",
    },
    listingId: {
      type: Array,
      default: [],
    },
    isFarmer: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    distancefromtarmac: {
      type: String,
    },
  },
  { timestamps: true }
);

// Export this model for import in the routes that will need to use it
module.exports = mongoose.model("Farmer", FarmerModel);
