const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
require("dotenv").config();

console.log(process.env.MONGO_URL);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Database connection error:", err));

app.get("/", (req, res) => {
  res.send("HELLO FROM ATM APP");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
