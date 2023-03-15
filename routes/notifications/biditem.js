const router = require("express").Router();
const BidItem = require("../../models/BidItem");
const FarmerProduce = require("../../models/FarmerProduce");

// Create bidItems*********************************************************************
router.post("/", async (req, res) => {
  const { buyerId, farmerId, itemname } = req.body;
  const availableFarmersItem = await BidItem.findOne({
    buyerId,
    itemname,
  });

  if (availableFarmersItem) {
    return res.status(400).json("Item already bid by you");
  } else {
    try {
      const newBidItem = new BidItem(req.body);
      const savedBidItem = await newBidItem.save();

      return res.status(200).json(savedBidItem);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
});

// Update bid item ************************************************************
router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await BidItem.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body,
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Item has been updated", updatedItem });
  } catch (err) {
    console.log(err);
    return res.status(500).json(res);
  }
});

// Get all bidItems of a partcular farmer's produce ***************************
router.get("/findbids/:farmerId/:itemname", async (req, res) => {
  try {
    const bidItems = await BidItem.find({
      farmerId: req.params.farmerId,
      itemname: req.params.itemname,
    });
    return res.status(200).json(bidItems);
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
});

// GET ALL BIDS WHERE ACCEPTED PRICE AND ACCEPTED TIME IS NOT NULL *********************************
router.get("/findbids/acceptedones", async (req, res) => {
  try {
    const boughtItems = await BidItem.find({
      accepteddate: { $exists: true, $ne: null },
      acceptedtime: { $exists: true, $ne: null },
    });
    return res.status(200).json(boughtItems);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
