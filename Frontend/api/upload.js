import cloudinary from "cloudinary";
import multiparty from "multiparty";

cloudinary.v2.config({
  cloud_name: "dbm8n49s9",
  api_key: "485484743158249",
  api_secret: "Ea7yTOhQXQk35qJw-KCFnUS6oKY",
});

export const config = {
  api: {
    bodyParser: false, // چون فایل داریم
  },
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://ordotabestan.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  try {
    const form = new multiparty.Form();
    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ message: "خطا در پردازش فایل" });

      const file = files.pdf?.[0];
      if (!file) return res.status(400).json({ message: "PDF آپلود نشد!" });

      const uploadedFile = await cloudinary.v2.uploader.upload(file.path, {
        resource_type: "raw",
      });

      return res.status(200).json({
        message: "فرم با موفقیت ذخیره شد ✅",
        parentName: fields.parentName?.[0],
        studentName: fields.studentName?.[0],
        relation: fields.relation?.[0],
        fileUrl: uploadedFile.secure_url,
      });
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "خطا در آپلود فایل", error });
  }
}
