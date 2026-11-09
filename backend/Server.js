const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connection to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("mongoDB connection error:", error);
  });

// api routes
const itemRoutes = require("./Items");

app.use("/api/items", itemRoutes);

// home route
app.get("/", (req, res) => {
  res.send("Program Project Tracker API is running");
});

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); 
});