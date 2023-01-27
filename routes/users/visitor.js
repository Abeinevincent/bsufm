const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorisedFarmer,
} = require("../../helpers/token");
const Visitor = require("../../models/Visitor");

// Create Visitor
router.post("/", verifyToken, async (req, res) => {
  try {
    const visitor = new Visitor({
      farmerId: req.body.farmerId,
      visitorId: req.body.visitorId,
    });

    const savedVisitor = await visitor.save();

    res.status(200).json(savedVisitor);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET A FARMER'S VISITORS
router.get("/:farmerId", verifyToken, async (req, res) => {
  try {
    const visitors = await Visitor.find({ farmerId: req.params.farmerId });
    res.status(200).json(visitors);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
