const router = require("express").Router();
const { verifyToken } = require("../../helpers/token");
const FarmerSpesfics = require("../../models/FarmerSpesfics");

// Create farmerspecifics
router.post("/", verifyToken, async (req, res) => {
  try {
    const newFarmerSpesfics = new FarmerSpesfics(req.body);
    const savedfarmer = await newFarmerSpesfics.save();
    return res.status(200).json(savedfarmer);
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
});

// Get all items in a farmerspecifics of a partcular farmer
router.get("findall/:itemname", verifyToken, async (req, res) => {
  try {
    const farmerspecifics = await FarmerSpesfics.find({
      itemname: req.params.itemname,
    });
    return res.status(200).json(farmerspecifics);
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
});

module.exports = router;
