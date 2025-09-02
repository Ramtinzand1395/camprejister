// api/upload.js
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const streamifier = require("streamifier");

const app = express();
app.use(cors());
app.use(express.json());

// ⚙️ تنظیم Cloudinary از Environment Variables
cloudinary.config({
  cloud_name: "ordo",
  api_key: "485484743158249",
  api_secret: "Ea7yTOhQXQk35qJw-KCFnUS6oKY",
});

// 📦 Multer (ذخیره موقت در RAM)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 🔹 تابع کمکی برای آپلود با Promise
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "raw" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

// 📤 آپلود PDF
app.post("/api/upload", upload.single("pdf"), async (req, res) => {
  try {
    const { parentName, studentName, relation } = req.body;
    const pdfFile = req.file;

    if (!pdfFile)
      return res.status(400).json({ message: "PDF آپلود نشد!" });

    const uploadedFile = await uploadToCloudinary(pdfFile.buffer);

    res.json({
      message: "فرم با موفقیت ذخیره شد ✅",
      parentName,
      studentName,
      relation,
      fileUrl: uploadedFile.secure_url,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "خطا در آپلود فایل", error: err });
  }
});

// 📂 سرو کردن فایل‌های React (برای حل مشکل رفرش)
app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

// برای لوکال
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
}

// برای Vercel
module.exports = app;
