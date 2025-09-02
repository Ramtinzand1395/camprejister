import path from "path";
import { fileURLToPath } from "url";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// سرو کردن React Build
app.use(express.static(path.join(__dirname, "build")));

// همه مسیرها به index.html هدایت شوند
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

export default app;
