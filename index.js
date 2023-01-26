// Initialise the app as an express app
const express = require("express");
const app = express();

// Import all dependencies and dev-dependencies
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv").config();

// Import all routes
const AuthRoute = require("./routes/auth/admin/auth");
const FarmerAuth = require("./routes/auth/farmer/auth");
const BuyerAuth = require("./routes/auth/buyer/auth");
const BuyerRoute = require("./routes/users/buyer");
const FarmerRoute = require("./routes/users/farmer");
const FarmerProduceRoute = require("./routes/farmerproduce/FarmerProduce");
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
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
// app.use(errors.notFound);
// app.use(errors.generalErrorHandler);

app.use("/api/auth/admin", AuthRoute);
app.use("/api/auth/farmer", FarmerAuth);
app.use("/api/auth/buyer", BuyerAuth);
app.use("/api/users/buyer", BuyerRoute);
app.use("/api/users/farmer", FarmerRoute);
app.use("/api/farmerproduce", FarmerProduceRoute);

// Start the backend server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Backend server is listening at port ${PORT}`);
});
