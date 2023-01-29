const router = require("express").Router();
const Farmer = require("../../models/Farmer");
const {
  verifyTokenAndAuthorisedFarmer,
  verifyTokenAndFarmer,
  verifyToken,
} = require("../../helpers/token");

// UPDATE FARMER *****************************
router.put("/:id", verifyTokenAndAuthorisedFarmer, async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedFarmer = await Farmer.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({ message: "Farmer has been updated", updatedFarmer });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET FARMER ***********************
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const farmer = await Farmer.findOne({ _id: req.params.id });
    const { password, ...others } = farmer._doc;
    res.status(200).json({ ...others });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET ALL FARMERS ************************

router.get("/", verifyToken, async () => {
  try {
    const farmers = await Farmer.find();
    return res.status(200).json(farmers);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
