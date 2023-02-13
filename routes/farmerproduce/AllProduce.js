const router = require("express").Router();
const { verifyToken } = require("../../helpers/token");
const AllProduce = require("../../models/AllProduce");

// CREATE ALL PRODUCE *****************************
router.post("/", async (req, res) => {
  try {
    // Check if item with same name already exists
    const existingItem = await AllProduce.findOne({
      itemname: req.body.itemname,
    });

    if (existingItem) {
      // If it does, update its quantity
      const newQuantity = existingItem.itemquantity + req.body.itemquantity;
      await AllProduce.findOneAndUpdate(
        { itemname: req.body.itemname },
        { $set: { itemquantity: newQuantity }, new: true }
      );
      return res.status(200).json("Successfully updated");
    } else {
      // If it doesn't, create a new item
      const newProduce = new AllProduce(req.body);
      const savedProduce = await newProduce.save();
      return res.status(201).json(savedProduce);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET ALL PRODUCE IN THE DB *******************

// *****
router.get("/", async (req, res) => {
  try {
    const produce = await AllProduce.find();
    return res.status(200).json(produce);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
