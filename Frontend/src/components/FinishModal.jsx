import React from "react";

const FinishModal = ({ data }) => {
    console.log(data)
  // ساخت لینک دانلود با پسوند .pdf
  const downloadUrl = data?.fileUrl
    ? `${data.fileUrl}.pdf`
    : null;

  const handleClose = () => {
    window.location.href = "/"; // ریدایرکت به صفحه اول + رفرش
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Modal content */}
      <div className="relative z-50 w-[80vw] max-w-3xl bg-white rounded-2xl p-6 shadow-xl animate-fadeIn max-h-[90vh] overflow-y-auto text-center">
        <h2 className="text-xl font-bold mb-4">ثبت اطلاعات تکمیل شد✅</h2>
        <p className="mb-6">
          توجه داشته باشید حضور تمامی شرکت کننده‌ها رأس ساعت ۶ بامداد چهارشنبه درب آتشکده الزامی می‌باشد.
        </p>

        {downloadUrl ? (
          <a
            href={downloadUrl}
            download="form.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            دانلود فایل PDF رضایت نامه
          </a>
        ) : (
          <p className="text-red-500">لینک فایل موجود نیست!</p>
        )}

        {/* دکمه بستن */}
        <div className="mt-6">
          <button
            onClick={handleClose}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 transition"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishModal;
