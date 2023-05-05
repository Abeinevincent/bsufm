const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const { totalPigs, pigsOnHeat, typeOfBreed, farmername, farmerContact } =

const InserminateSchema = new Schema(
  {
    totalPigs: {
      type: String,
      required: true,
    },
    pigsOnHeat: {
      type: String,
      required: true,
    },

    typeOfBreed: {
      type: String,
      required: true,
    },
    farmername: {
      type: String,
      required: true,
    },
    farmerContact: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inserminate", InserminateSchema);
