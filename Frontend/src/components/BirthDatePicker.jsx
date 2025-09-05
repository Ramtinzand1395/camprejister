import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const BirthDatePicker = ({ formData, setFormData }) => {
  return (
    <div className="w-full">
      <label className="block font-medium mb-1">تاریخ تولد:</label>
      <DatePicker
        value={formData.birthday}
        onChange={(date) => {
          if (!date) return;

          const year = date.year;
          if (year < 1381 || year > 1396) {
            alert("تاریخ تولد باید بین سال ۱۳۸۱ تا ۱۳۹۶ باشد.");
            setFormData((prev) => ({ ...prev, birthday: "" }));
          } else {
            setFormData((prev) => ({
              ...prev,
              birthday: date.format("YYYY/MM/DD"),
            }));
          }
        }}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        style={{
          width: "100%",
          height: "42px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          padding: "0 12px",
          fontSize: "14px",
          textAlign: "right",
        }}
        placeholder="انتخاب تاریخ"
      />
    </div>
  );
};
export default BirthDatePicker;
