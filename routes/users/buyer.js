const router = require("express").Router();
const Buyer = require("../../models/Buyer");
const {
  verifyTokenAndAuthorisedBuyer,
  verifyTokenAndBuyer,
} = require("../../helpers/token");

// UPDATE USER *****************************
router.put("/update/:id", verifyTokenAndAuthorisedBuyer, async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedBuyer = await Buyer.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({ message: "Buyer has been updated", updatedBuyer });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET BUYER ***********************
router.get("/:id", async (req, res) => {
  try {
    const user = await Buyer.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
