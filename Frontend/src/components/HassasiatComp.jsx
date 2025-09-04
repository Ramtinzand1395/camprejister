import React from "react";

const HassasiatComp = ({
  haveHassasiat,
  setHaveHassasiat,
  Hassasiat,
  setHassasiat,
  foodAllergy,
  setFoodAllergy,
  drugAllergy,
  setDrugAllergy,
}) => {
  return (
    <div>
      {/* رادیوهای انتخاب دارم/ندارم */}
      <div className="flex items-center">
        <label className="flex items-center container my-5">
          <input
            type="radio"
            name="hassasiat"
            checked={haveHassasiat === true}
            onChange={() => setHaveHassasiat(true)}
          />
          <svg className="ml-2" viewBox="0 0 64 64" height="2em" width="2em">
            <path
              d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
              pathLength="575.0541381835938"
              className="path"
            />
          </svg>
          <p>حساسیت دارم</p>
        </label>

        <label className="flex items-center container my-5">
          <input
            type="radio"
            name="hassasiat"
            checked={haveHassasiat === false}
            onChange={() => {
              setHaveHassasiat(false);
              setHassasiat("");
              setFoodAllergy(false);
              setDrugAllergy(false);
            }}
          />
          <svg className="ml-2" viewBox="0 0 64 64" height="2em" width="2em">
            <path
              d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
              pathLength="575.0541381835938"
              className="path"
            />
          </svg>
          <p>هیچ حساسیت ندارم</p>
        </label>
      </div>

      {/* وقتی کاربر "دارم" انتخاب کنه */}
      {haveHassasiat && (
        <div className="my-4">
          <div className=" flex items-center">
            {/* حساسیت دارویی */}
            <div className="flex items-center space-x-3">
              <label className="group flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={drugAllergy}
                  onChange={(e) => setDrugAllergy(e.target.checked)}
                  className="hidden peer"
                />

                <span className="relative w-8 h-8 flex justify-center items-center bg-gray-100 border-2 border-gray-400 rounded-md shadow-md transition-all duration-500 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-hover:scale-105">
                  <span className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 opacity-0 peer-checked:opacity-100 rounded-md transition-all duration-500 peer-checked:animate-pulse"></span>

                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="hidden w-5 h-5 text-white peer-checked:block transition-transform duration-500 transform scale-50 peer-checked:scale-100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </span>

                <span className="ml-3 my-2 text-gray-700 group-hover:text-blue-500 font-medium transition-colors duration-300">
                  حساسیت دارویی دارم
                </span>
              </label>
            </div>

            {/* حساسیت غذایی */}
            <div className="flex items-center space-x-3">
              <label className="group flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={foodAllergy}
                  onChange={(e) => setFoodAllergy(e.target.checked)}
                  className="hidden peer"
                />

                <span className="relative w-8 h-8 flex justify-center items-center bg-gray-100 border-2 border-gray-400 rounded-md shadow-md transition-all duration-500 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-hover:scale-105">
                  <span className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 opacity-0 peer-checked:opacity-100 rounded-md transition-all duration-500 peer-checked:animate-pulse"></span>

                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="hidden w-5 h-5 text-white peer-checked:block transition-transform duration-500 transform scale-50 peer-checked:scale-100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </span>

                <span className="ml-3 text-gray-700 group-hover:text-blue-500 font-medium transition-colors duration-300">
                  حساسیت غذایی دارم
                </span>
              </label>
            </div>
          </div>

          {/* توضیح حساسیت */}
          <h3 className="text-sm text-red-500">در خصوص حساسیت کامل توضیح دهید.</h3>
          <textarea
            value={Hassasiat}
            onChange={(e) => setHassasiat(e.target.value)}
            rows={5}
            cols={40}
            className="border p-2 w-full"
          />
        </div>
      )}
    </div>
  );
};

export default HassasiatComp;
