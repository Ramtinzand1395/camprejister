// api/upload.js
import multer from "multer";
import cloudinary from "cloudinary";
import streamifier from "streamifier";

cloudinary.v2.config({
  cloud_name: "ordo",
  api_key: "485484743158249",
  api_secret: "Ea7yTOhQXQk35qJw-KCFnUS6oKY",
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

// تابع برای آپلود PDF به Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      { resource_type: "raw" },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

// Vercel Handler
export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  try {
    // Multer داخل Serverless کمی فرق می‌کنه
    const multerPromise = new Promise((resolve, reject) => {
      upload.single("pdf")(req, {}, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    await multerPromise;

    const { parentName, studentName, relation } = req.body;
    const pdfFile = req.file;

    if (!pdfFile)
      return res.status(400).json({ message: "PDF آپلود نشد!" });

    const uploadedFile = await uploadToCloudinary(pdfFile.buffer);

    res.status(200).json({
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
}
