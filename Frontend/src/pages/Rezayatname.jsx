import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import axios from "axios";
import vazirFontBase64 from "../components/base copy"; // فایل فونت base64
import Canvas from "../components/Canves";
import emailjs from "@emailjs/browser";
import Bimari from "../components/Bimari";
import HassasiatComp from "../components/HassasiatComp";

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

  const [haveIllness, setHaveIllness] = useState(null); // null=انتخاب نشده
  const [bimari, setBimari] = useState("");

  const [haveHassasiat, setHaveHassasiat] = useState(null);
  const [Hassasiat, setHassasiat] = useState("");

  const canvasRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const persianRegex = /^[\u0600-\u06FF\s]+$/; // حروف فارسی و فاصله

    // بررسی خالی بودن فیلدها
    if (
      !formData.parentName ||
      !formData.studentName ||
      !formData.relation ||
      haveIllness === null ||
      haveHassasiat === null ||
      bimari === "" ||
      Hassasiat === ""
    ) {
      alert("همه موارد را به صورت صحیح تکمیل کنید.");
      return;
    }

    // بررسی فارسی بودن فیلدها
    if (
      !persianRegex.test(formData.parentName) ||
      !persianRegex.test(formData.studentName) ||
      !persianRegex.test(formData.relation)
    ) {
      alert("لطفاً همه موارد را فقط با حروف فارسی وارد کنید.");
      return;
    }

    const canvas = canvasRef.current;
    const signatureImage = canvas.toDataURL("image/png");

    // بررسی خالی بودن امضا
    const blankCanvas = document.createElement("canvas");
    blankCanvas.width = canvas.width;
    blankCanvas.height = canvas.height;
    const blankImage = blankCanvas.toDataURL("image/png");
    if (signatureImage === blankImage) {
      alert("لطفاً امضا را وارد کنید.");
      return;
    }

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
    doc.text(`بیماری: ${bimari}`, pageWidth - 40, y, {
      align: "right",
    });
    doc.text(`حسساسیت: ${Hassasiat}`, pageWidth - 40, y, {
      align: "right",
    });
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

      formDataToSend.append("haveIllness", haveIllness);
      formDataToSend.append("bimari", bimari);
      formDataToSend.append("haveHassasiat", haveHassasiat);
      formDataToSend.append("Hassasiat", Hassasiat);

      haveIllness;
      bimari;
      haveHassasiat;
      Hassasiat;
      const data = await axios.post(
        "https://ordotabestan.vercel.app/api/upload",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(data);
      if (data.status === 200) {
        try {
          const templateParams = {
            parentName: formData.parentName,
            studentName: formData.studentName,
            relation: formData.relation,
            pdfUrl: data.data.fileUrl, // URL فایل PDF آپلود شده روی سرور
            hassasiat:Hassasiat,
            bimari:bimari
          };

          await emailjs.send(
            "service_lgvd31t", // از EmailJS بگیر
            "template_vrmxxsd", // از EmailJS بگیر
            templateParams,
            "oXgRCi8-t7OO2ooqA" // از EmailJS بگیر
          );
        } catch (error) {
          console.error(error);
        }
      }
      alert("فرم با موفقیت به سرور ارسال شد!");
    } catch (error) {
      console.error(error);
      alert("ارسال فرم به سرور با خطا مواجه شد.");
    } finally {
      setLoading(false);
    }
  };
  const [Loading, setLoading] = useState(false);

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
      <div className="flex flex-col justify-center">
        <Bimari
          haveIllness={haveIllness}
          setHaveIllness={setHaveIllness}
          bimari={bimari}
          setBimari={setBimari}
        />
        <HassasiatComp
          haveHassasiat={haveHassasiat}
          setHaveHassasiat={setHaveHassasiat}
          Hassasiat={Hassasiat}
          setHassasiat={setHassasiat}
        />
      </div>
      {/* Canvas امضا */}
      <div className="mt-6">
        <label className="block mb-2 font-medium">امضا ولی:</label>
        <p className="text-xs text-red-600 my-2">
          با موس یا انگشت داخل باکس بکشید
        </p>

        <Canvas canvasRef={canvasRef} />
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
