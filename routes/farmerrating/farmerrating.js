const router = require("express").Router();
const { verifyToken } = require("../../helpers/token");
const Rating = require("../../models/Rating");

// Create Rating
router.post("/", verifyToken, async (req, res) => {
  try {
    const rating = new Rating(req.body);
    const savedRating = await rating.save();

    res.status(200).json(savedRating);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// GET A FARMER'S SINGLE RATING
router.get("/:ratingId", verifyToken, async (req, res) => {
  try {
    const ratings = await Rating.find({ _id: req.params.farmerId });
    res.status(200).json(ratings);
  } catch (err) {
    console.log(err);
  }
});

// GET A FARMER'S ALL RATINGS
router.get("/:farmerId", verifyToken, async (req, res) => {
  try {
    const ratings = await Rating.find({ farmerId: req.params.farmerId });
    res.status(200).json(ratings);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
