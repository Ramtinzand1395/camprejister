import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import axios from "axios";
import vazirFontBase64 from "../components/base copy"; // فایل فونت base64

const getPersianDate = () => {
  const date = new Date();
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const Rezayatname = () => {
  const [formData, setFormData] = useState({
    parentName: "",
    studentName: "",
    relation: "",
  });

  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // // شروع و رسم امضا
  // const startDrawing = (e) => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");
  //   ctx.strokeStyle = "black";
  //   ctx.lineWidth = 2;
  //   ctx.lineJoin = "round";
  //   ctx.lineCap = "round";
  //   ctx.beginPath();
  //   ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  //   setIsDrawing(true);
  // };

  // const draw = (e) => {
  //   if (!isDrawing) return;
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");
  //   ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  //   ctx.stroke();
  // };

  // const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSubmit = async () => {
    const canvas = canvasRef.current;
    const signatureImage = canvas.toDataURL("image/png");

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    // اضافه کردن فونت فارسی
    doc.addFileToVFS("BNAZANB.ttf", vazirFontBase64);
    doc.addFont("BNAZANB.ttf", "BNAZANB", "normal");
    doc.setFont("BNAZANB");

    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 40;
    const lineHeight = 20;

    doc.setFontSize(14);

    doc.text(`فرم رضایت‌نامه ولی شرکت‌کننده`, pageWidth - 40, y, {
      align: "right",
    });
    y += lineHeight * 2;

    doc.text(`اینجانب: ${formData.parentName}`, pageWidth - 40, y, {
      align: "right",
    });
    y += lineHeight;
    doc.text(`ولی دانش‌آموز: ${formData.studentName}`, pageWidth - 40, y, {
      align: "right",
    });
    y += lineHeight;
    doc.text(`نسبت با دانش‌آموز: ${formData.relation}`, pageWidth - 40, y, {
      align: "right",
    });
    y += lineHeight * 2;

    const text = `بدین‌وسیله رضایت کامل خود را جهت شرکت فرزندم در اردوی یک و نیم روزه تابستانه کرمان 
      مورخ ۱۹ تا ۲۰ شهریور ماه در محل آتشکده زرتشتیان کرمان که توسط کمیسیون جوانان زرتشتی کرمان برگزار می‌گردد، اعلام می‌دارم و موارد زیر را تأیید می‌کنم:`;

    // عرض قابل استفاده در صفحه (حاشیه 30pt)
    const textWidth = pageWidth - 60;

    // تقسیم متن به خطوط
    const lines = doc.splitTextToSize(text, textWidth);

    // چاپ متن راست‌چین
    doc.text(lines, pageWidth - 30, y, { align: "right" });

    // بروزرسانی y بر اساس تعداد خطوط
    y += lines.length * lineHeight;

    const bulletPoints = [
      "از آیین نامه اردو آگاه هستم و آن را با دقت کامل خوانده‌ام.",
      "مسئولین برگزاری اردو مجاز به اقدامات درمانی یا پزشکی فوری هستند.",
      "رعایت نظم، مقررات اردو و دستورات مسئولین بر عهده فرزندم است.",
      "هرگونه مسئولیت ناشی از عدم رعایت مقررات بر عهده اینجانب است.",
      "فرزندم از سلامت جسمی و روحی کافی برخوردار است و هیچ محدودیتی ندارد.",
      "در صورت بروز رفتار نامناسب، تصمیم نهایی با برگزارکنندگان است.",
      "با شرکت فرزندم در اردو موافقت می‌کنم و تمام شرایط و ضوابط آن را می‌پذیرم.",
    ];

    bulletPoints.forEach((text) => {
      doc.text(`• ${text}`, pageWidth - 60, y, { align: "right" });
      y += lineHeight;
    });

    y += lineHeight;
    doc.text(`تاریخ: ${getPersianDate()}`, pageWidth - 40, y, {
      align: "right",
    });
    y += lineHeight * 2;

    // اضافه کردن امضا در سمت راست
    doc.addImage(signatureImage, "PNG", pageWidth - 240, y, 200, 100);

    // تبدیل PDF به blob
    const pdfBlob = doc.output("blob");

    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("pdf", pdfBlob, "consent_form.pdf");
      formDataToSend.append("parentName", formData.parentName);
      formDataToSend.append("studentName", formData.studentName);
      formDataToSend.append("relation", formData.relation);

      await axios.post(
        "https://ordotabestan.vercel.app/api/upload",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("فرم با موفقیت به سرور ارسال شد!");
    } catch (error) {
      console.error(error);
      alert("ارسال فرم به سرور با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  };
  const [Loading, setLoading] = useState(false);

  const getCoordinates = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    if (event.touches) {
      // برای موبایل
      return {
        x: event.touches[0].clientX - rect.left,
        y: event.touches[0].clientY - rect.top,
      };
    } else {
      // برای دسکتاپ
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }
  };

  const startDrawing = (event) => {
    const { x, y } = getCoordinates(event);
    setIsDrawing(true);
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (event) => {
    if (!isDrawing) return;
    const { x, y } = getCoordinates(event);
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">
        فرم رضایت‌نامه ولی شرکت‌کننده
      </h1>
      <p className="my-4 font-medium text-right">تاریخ: {getPersianDate()}</p>

      <div className="flex flex-col items-start justify-center space-y-2.5 mb-4">
        <div>
          <label className="block font-medium mb-1">اینجانب:</label>
          <input
            type="text"
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-right"
            placeholder="نام ولی را وارد کنید"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">ولی دانش‌آموز:</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-right"
            placeholder="نام دانش‌آموز را وارد کنید"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">نسبت با دانش‌آموز:</label>
          <select
            name="relation"
            value={formData.relation}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-right"
            required
          >
            <option value="" disabled>
              انتخاب کنید
            </option>
            <option value="پدر">پدر</option>
            <option value="مادر">مادر</option>
          </select>
        </div>
      </div>
      <p className="mt-4">
        بدین‌وسیله رضایت کامل خود را جهت شرکت فرزندم در اردوی یک و نیم روزه
        تابستانه کرمان مورخ ۱۹ تا ۲۰ شهریور ماه در محل آتشکده زرتشتیان کرمان که
        توسط کمیسیون جوانان زرتشتی کرمان برگزار می‌گردد، اعلام می‌دارم و موارد
        زیر را تأیید می‌کنم:
      </p>

      <ul className="list-disc list-inside mt-2 space-y-1">
        <li>از آیین نامه اردو آگاه هستم و آن را با دقت کامل خوانده‌ام.</li>
        <li>
          مسئولین برگزاری اردو را مجاز به تصمیم‌گیری‌های لازم در مورد فرزندم
          می‌دانم و در صورت نیاز به اقدامات درمانی یا پزشکی فوری، اقدامات لازم
          انجام شود.
        </li>
        <li>
          درک می‌کنم که رعایت نظم، مقررات اردو و دستورات مسئولین برگزاری اردو بر
          عهده فرزندم است.
        </li>
        <li>
          هرگونه مسئولیت ناشی از عدم رعایت مقررات توسط فرزندم، بر عهده اینجانب
          خواهد بود.
        </li>
        <li>
          فرزندم از سلامت جسمی و روحی کافی برخوردار است و هیچ محدودیتی در شرکت
          در فعالیت‌های اردو ندارد.
        </li>
        <li>
          در صورت بروز هرگونه رفتار نامناسب، تصمیم نهایی در مورد ادامه شرکت در
          اردو با برگزارکنندگان است.
        </li>
        <li>
          با شرکت فرزندم در این اردو موافقت می‌کنم و تمام شرایط و ضوابط آن را
          می‌پذیرم.
        </li>
      </ul>
      {/* Canvas امضا */}
      <div className="mt-6">
        <label className="block mb-2 font-medium">امضا ولی:</label>
        <canvas
          ref={canvasRef}
          width={500}
          height={150}
          className="border border-gray-400 rounded"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />

        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={clearCanvas}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            پاک کردن
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        {Loading ? "loading..." : "  ثبت فرم"}
      </button>
    </div>
  );
};

export default Rezayatname;
