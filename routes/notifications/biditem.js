const router = require("express").Router();
const BidItem = require("../../models/BidItem");

// Create bidItems
router.post("/", async (req, res) => {
  try {
    const newBidItem = new BidItem(req.body);
    const savedBidItem = await newBidItem.save();
    return res.status(200).json(savedBidItem);
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
});

// // Get all bidItems of a partcular farmer
// router.get("/findfarmer/:farmerId", verifyToken, async (req, res) => {
//   try {
//     const bidItems = await BidItem.find({
//       farmerId: req.params.farmerId,
//       sendTo: "farmer",
//     });
//     return res.status(200).json(bidItems);
//   } catch (err) {
//     console.log(err);
//     return res.status(200).json(err);
//   }
// });

// // Get all bidItems of a partcular buyer
// router.get("/findbuyer/:buyerId", verifyToken, async (req, res) => {
//   try {
//     const bidItems = await BidItem.find({
//       buyerId: req.params.buyerId,
//       sendTo: "buyer",
//     });
//     return res.status(200).json(bidItems);
//   } catch (err) {
//     console.log(err);
//     return res.status(200).json(err);
//   }
// });

// // Get all bidItems of a partcular buyer
// router.get("/:id", verifyToken, async (req, res) => {
//   try {
//     const bidItems = await BidItem.find({
//       _id: req.params.id,
//     });
//     return res.status(200).json(bidItems);
//   } catch (err) {
//     console.log(err);
//     return res.status(200).json(err);
//   }
// });

module.exports = router;
