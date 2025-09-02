const express = require("express");
const path = require("path");
const cors = require("cors"); // ✅ اضافه شد

const app = express();

// فعال کردن CORS برای همه درخواست‌ها
app.use(cors({
  origin: "https://ordotabestan.vercel.app", // دامنه فرانت
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

// سرو کردن React build
app.use(express.static(path.join(__dirname, "build")));

// همه مسیرها به index.html هدایت شوند (React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

module.exports = app;
