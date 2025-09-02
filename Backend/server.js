const express = require("express");
const path = require("path");

const app = express();

// سرو کردن React build
app.use(express.static(path.join(__dirname, "build")));

// همه مسیرها به index.html هدایت شوند
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

module.exports = app;
