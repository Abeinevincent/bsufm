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
    return res.status(201).json(newInserm);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
