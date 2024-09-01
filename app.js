const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/UsersRoute");

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Database connection error:", err));

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("HELLO FROM ATM APP");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
