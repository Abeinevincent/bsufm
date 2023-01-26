const router = require("express").Router();
const Buyer = require("../../models/Buyer");
const {
  verifyTokenAndAuthorisedBuyer,
  verifyTokenAndBuyer,
  verifyToken,
} = require("../../helpers/token");
const Visitor = require("../../models/Visitor");

// Create Visitor
router.post("/:id", verifyToken, async () => {

    try {
        const visitor = await Visitor.findOne({id: req.params.id})

        if(!visitor) {
            const newVisitor = new Visitor({
                id: req.params.id
            })
            const savedVisitor = await newVisitor.save()
            return res.status(200).json(err)
        } else {
            return
        }

    } catch(err) {
        console.log(err)
        return res.status(500).json(err)
    }

    

  try {
    const newView = await Buyer.findOne({ _id: req.params.name });
    if (newView) {
    }

    // Storing the records from the Visitor table
    let visitors = await Visitor.findOne({ _id: req.params.name });

    // If the app is being visited first
    // time, so no records
    if (visitors == null) {
      // Creating a new default record
      const beginCount = new Visitor({
        name: "localhost",
        count: 1,
      });

      // Saving in the database
      beginCount.save();

      // Sending the count of visitor to the browser
      res.send(`<h2>Counter: ` + 1 + "</h2>");

      // Logging when the app is visited first time
      console.log("First visitor arrived");
    } else {
      // Incrementing the count of visitor by 1
      visitors.count += 1;

      // Saving to the database
      visitors.save();

      // Sending the count of visitor to the browser
      res.send(`<h2>Counter: ` + visitors.count + "</h2>");

      // Logging the visitor count in the console
      console.log("visitor arrived: ", visitors.count);
    }
  } catch (err) {
    console.log(res);
    return res.status(500).json(err);
  }
});

module.exports = router;
