import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Aiinname = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event) => {
    setIsChecked(event.target.checked); // true or false
  };
  const navigate = useNavigate();
  const handleNext = () => {
    console.log(isChecked)
    if (!isChecked) {
      alert("با شرایط موافقت نکردید.");
      return
    }
    navigate('/rezayatname')
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        آئین نامه اردو یک و نیم روزه تابستان کرمان
      </h1>

      <p className="mb-4 text-gray-700">
        بدین وسیله نکات قابل توجه پیرامون برگزاری «اردو یک و نیم روزه تابستان
        کرمان» به اطلاع تمامی شرکت‌کنندگان و خانواده‌های محترمشان می‌رسانیم:
      </p>

      <p className="mb-4 text-gray-700">
        این آئین نامه به منظور توجیه و تفهیم کامل مسائل مربوط به اردو برای
        «تمامی شرکت‌کنندگان و خانواده‌های عزیزشان» فراهم شده است و هیچگونه توجیه
        و توضیح دیگری مبنی بر عدم اطلاع از قوانین و مقررات مربوط به اردو قابل
        پذیرش نخواهد بود.
      </p>

      <p className="mb-6 text-gray-700 font-semibold">
        مسئولیت و عواقب هرگونه اطلاعات غلط بر عهده شرکت کننده و والدین می‌باشد.
      </p>

      <h2 className="text-2xl font-bold mb-4">وسایل ضروری:</h2>
      <ul className="list-disc list-inside mb-6 text-gray-700">
        <li>دو عدد ملحفه (به عنوان زیرانداز و رو انداز)</li>
        <li>پتوی مسافرتی سبک (اختیاری)</li>
        <li>حداقل دو دست لباس سفید (پیراهن یا تیشرت)</li>
        <li>حداقل یک دست لباس راحتی خواب</li>
        <li>حداقل دو دست لباس زیر و جوراب اضافه</li>
        <li>
          لوازم شخصی و بهداشتی (مسواک، خمیر دندان، شامپو، صابون، حوله و ...)
        </li>
        <li>داروی خاص و مورد مصرف (تحویل به پزشک اردو هنگام ورود)</li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">وسایل ممنوع:</h2>
      <p className="mb-2 text-gray-700">
        لازم به توضیح است که تمامی وسایل زیر در ابتدای اردو توسط تیم برگزاری ضبط
        خواهد شد و در پایان اردو بازگردانده خواهد شد. تیم برگزارکننده مسئولیتی
        در قبال گم شدن یا آسیب دیدن آن‌ها ندارد:
      </p>
      <ul className="list-disc list-inside mb-6 text-gray-700">
        <li>
          وسایل الکتریکی: گوشی موبایل، تبلت، لپ‌تاپ، ساعت هوشمند، هندزفری و ...
        </li>
        <li>زیورآلات و پیرسینگ</li>
        <li>لنز طبی و غیرطبی</li>
        <li>خوراکی، نوشیدنی و تنقلات</li>
        <li>
          وسایل خطرناک یا غیرضروری: فندک، کبریت، دخانیات، مواد محترقه، اجسام تیز
          مانند کارد، تیغ و ژیلت
        </li>
      </ul>

      <h2 className="text-2xl font-bold mb-4">نکات مهم:</h2>
      <ul className="list-decimal list-inside mb-6 text-gray-700">
        <li>
          استفاده از شلوار پاره، شلوارک و دامن کوتاه در اردو ممنوع است. (دختران
          می‌توانند دامن بلند تا مچ پا بپوشند)
        </li>
        <li>
          رعایت بهداشت فردی و ظاهری آراسته الزامی است. ناخن بلندتر از 3 میلیمتر
          غیرمجاز است.
        </li>
        <li>
          ورود و خروج پس از آغاز اردو غیرممکن است و خروج به منزله انصراف شرکت
          کننده محسوب می‌شود.
        </li>
      </ul>

      <p className="mb-6 text-gray-700 font-semibold">
        در صورت رعایت نکردن نکات بالا، بر هم زدن نظم عمومی اردو یا انجام اقدامات
        پرخطر، تیم برگزاری حق حذف و اخراج شرکت‌کننده متخلف را محفوظ می‌داند.
      </p>

      <p className="text-gray-800 font-bold">
        برای هرگونه سوال یا ابهام با شماره{" "}
        <span className="text-blue-600">09138433385</span> (رامتین زندخاوری)
        تماس حاصل فرمایید.
      </p>
      <label className="flex items-center container my-5">
        <input
          checked={isChecked} // controlled by state
          onChange={handleChange}
          type="checkbox"
        />
        <svg className="ml-2" viewBox="0 0 64 64" height="2em" width="2em">
          <path
            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
            pathLength="575.0541381835938"
            class="path"
          ></path>
        </svg>
        <p>آیین نامه را به صورت کامل مطالعه کردم</p>
      </label>
      <button
        onClick={() => handleNext()}
        class="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group cursor-pointer border"
        type="button"
      >
        {/* <Link to={"/rezayatname"}> */}
          <div class="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              height="25px"
              width="25px"
            >
              <path
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                fill="#000000"
              ></path>
              <path
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                fill="#000000"
              ></path>
            </svg>
          </div>
          <p class="translate-x-2">بعدی</p>
        {/* </Link> */}
      </button>
    </div>
  );
};

export default Aiinname;
