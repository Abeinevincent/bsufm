const router = require("express").Router();
const { verifyToken } = require("../../helpers/token");
const FarmerSpesfics = require("../../models/FarmerSpecifics");

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

// Get sum of farmers with a specific produce
// router.get("/farmers/:produceName", async (req, res) => {
//   try {
//     const results = await FarmerSpesfics.aggregate([
//       {
//         $match: {
//           itemname: req.params.produceName,
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           sumOfColumn: { $sum: "$itemprice" },
//         },
//       },
//     ]).exec();
//     res.status(200).json(results);
//   } catch (err) {
//     console.log(err);
//   }
// });

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
