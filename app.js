const express = require("express");
require("dotenv").config();

const chantierRoutes = require("./routes/chantierRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/v1/chantier", chantierRoutes);
app.use("/api/v1/auth", userRoutes);

app.use("/api/v1/", function (req, res) {
  res.send("Bienvenidos 🐱‍🚀");
});

module.exports = app;
