const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/UsersRoute");
const transactionRoutes = require("./routes/TransactionsRoute");

app.use(express.json());

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html for the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve login.html for the login page
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Serve accounts.html for the accounts page
app.get("/accounts", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "accounts.html"));
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Database connection error:", err));

app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);

app.listen(3000, () => {
  console.log(`App listening on port 3000`);
});
