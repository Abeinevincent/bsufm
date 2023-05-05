const Inserminate = require("../models/Inserminate");

const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const { totalPigs, pigsOnHeat, typeOfBreed, farmername, farmerContact } =
      req.body;
    const newInserm = new Inserminate({
      totalPigs,
      pigsOnHeat,
      typeOfBreed,
      farmername,
      farmerContact,
    });
    const savedInserm = await newInserm.save();
    return res.status(201).json(savedInserm);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
