import multer from "multer";
import cloudinary from "cloudinary";
import streamifier from "streamifier";

// تنظیمات Cloudinary
cloudinary.v2.config({
  cloud_name: "dbm8n49s9",
  api_key: "485484743158249",
  api_secret: "Ea7yTOhQXQk35qJw-KCFnUS6oKY",
});

// Multer برای دریافت فایل در حافظه
const storage = multer.memoryStorage();
const upload = multer({ storage });

// تابع آپلود به Cloudinary
const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      { resource_type: "raw" },
      (err, result) => (err ? reject(err) : resolve(result))
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });

// تابع اصلی handler
export default async function handler(req, res) {
  // CORS
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://ordotabestan.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // دریافت فایل PDF
    await new Promise((resolve, reject) =>
      upload.single("pdf")(req, {}, (err) => (err ? reject(err) : resolve()))
    );

    const pdfFile = req.file;
    if (!pdfFile) {
      console.error("No PDF file received!");
      return res.status(400).json({ message: "PDF آپلود نشد!" });
    }

    console.log("PDF received:", pdfFile.originalname, "size:", pdfFile.size);

    // آپلود به Cloudinary
    const uploadedFile = await uploadToCloudinary(pdfFile.buffer).catch(
      (err) => {
        console.error("Cloudinary upload error:", err);
        throw err;
      }
    );

    const { parentName, studentName, relation } = req.body;

    console.log("Form data:", { parentName, studentName, relation });
    console.log("Uploaded file URL:", uploadedFile.secure_url);

    res.status(200).json({
      message: "فرم با موفقیت ذخیره شد ✅",
      parentName,
      studentName,
      relation,
      fileUrl: uploadedFile.secure_url,
    });
  } catch (err) {
    console.error("Upload handler error:", err);
    res
      .status(500)
      .json({ message: "خطا در آپلود فایل", error: err.message || err });
  }
}
