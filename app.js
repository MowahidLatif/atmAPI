const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const path = require("path"); // Add this line
require("dotenv").config();
const userRoutes = require("./routes/UsersRoute");
const transactionRoutes = require("./routes/TransactionsRoute");

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Database connection error:", err));

app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
