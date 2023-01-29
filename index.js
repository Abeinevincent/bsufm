// Initialise the app as an express app
const express = require("express");
const app = express();

// Import all dependencies and dev-dependencies
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv").config();
const path = require("path");
const multer = require("multer");

// Import all routes
const AuthRoute = require("./routes/auth/admin/auth");
const FarmerAuth = require("./routes/auth/farmer/auth");
const BuyerAuth = require("./routes/auth/buyer/auth");
const BuyerRoute = require("./routes/users/buyer");
const FarmerRoute = require("./routes/users/farmer");
const FarmerProduceRoute = require("./routes/farmerproduce/FarmerProduce");
const VisitorsRoute = require("./routes/users/visitor");
const RatingsRoute = require("./routes/farmerrating/farmerrating");
// const errors = require("./routes/errors");

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected to the backend successfully");
  })
  .catch((err) => console.log(err));

// Middlewares
app.use(cors());
// Image Upload with multer
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
// app.use(errors.notFound);
// app.use(errors.generalErrorHandler);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    console.log("No file uploaded");
  } else {
    try {
      console.log(req.file.filename);
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      return console.error(error);
    }
  }
});

app.use("/api/auth/admin", AuthRoute);
app.use("/api/auth/farmer", FarmerAuth);
app.use("/api/auth/buyer", BuyerAuth);
app.use("/api/users/buyer", BuyerRoute);
app.use("/api/users/farmer", FarmerRoute);
app.use("/api/farmerproduce", FarmerProduceRoute);
app.use("/api/visitors", VisitorsRoute);
app.use("/api/ratings", RatingsRoute);

// Start the backend server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Backend server is listening at port ${PORT}`);
});
