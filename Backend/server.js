const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// مسیر ذخیره فایل‌ها
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("pdf"), (req, res) => {
  const { parentName, studentName, relation } = req.body;
  const pdfFile = req.file;

  if (!pdfFile) return res.status(400).json({ message: "PDF آپلود نشد!" });

  console.log("File saved to:", pdfFile.path);

  // ذخیره داده‌ها در فایل JSON
  const dataFile = path.join(uploadDir, "formData.json");
  let allForms = [];
  if (fs.existsSync(dataFile)) {
    allForms = JSON.parse(fs.readFileSync(dataFile));
  }
  allForms.push({
    parentName,
    studentName,
    relation,
    pdfPath: pdfFile.path,
    createdAt: new Date(),
  });
  fs.writeFileSync(dataFile, JSON.stringify(allForms, null, 2));

  res.json({ message: "فرم با موفقیت دریافت و ذخیره شد." });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
