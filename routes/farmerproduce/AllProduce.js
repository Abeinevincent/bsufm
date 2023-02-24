const router = require("express").Router();
const { verifyToken, verifyTokenAndFarmer } = require("../../helpers/token");
const AllProduce = require("../../models/AllProduce");

// CREATE ALL PRODUCE *****************************
router.post("/", async (req, res) => {
  try {
    // Check if item with same name already exists
    const existingItem = await AllProduce.findOne({
      itemname: req.body.itemname,
    });

    // Convert to tonnes if quantity is greater than 1000
    const quantity = req.body.itemquantity;
    const unit = req.body.itemunit;

    if (existingItem) {
      // If it exists, update its quantity
      const updatedQuantity = existingItem.itemquantity + req.body.itemquantity;
      const updatedProduce = await AllProduce.findOneAndUpdate(
        { itemname: req.body.itemname },
        {
          $set: { itemquantity: updatedQuantity },
          new: true,
        }
      );
      return res.status(200).json({ message: "Successfully updated" });
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

// UPDATE PRODUCE ****************************
router.put("/update/:itemname", verifyTokenAndFarmer, async (req, res) => {
  try {
    const existingItem = await AllProduce.findOne({
      itemname: req.params.itemname,
    });
    const updatedQuantity =
      existingItem.itemquantity -
      (existingItem.itemquantity - req.body.itemquantity);
    await AllProduce.findOneAndUpdate(
      { itemname: req.params.itemname },
      {
        $set: { itemquantity: updatedQuantity },
        new: true,
      }
    );
    return res.status(200).json({ message: "Successfully updated" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
