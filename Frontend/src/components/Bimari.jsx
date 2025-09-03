import React from "react";

const Bimari = ({ haveIllness, setHaveIllness, bimari, setBimari }) => {
  return (
    <div>
      <div className="flex items-center">
        <label className="flex items-center container my-5">
          <input
            type="radio"
            name="illness"
            checked={haveIllness === true}
            onChange={() => setHaveIllness(true)}
          />
          <svg className="ml-2" viewBox="0 0 64 64" height="2em" width="2em">
            <path
              d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
              pathLength="575.0541381835938"
              className="path"
            />
          </svg>
          <p>بیماری خاصی دارم</p>
        </label>

        <label className="flex items-center container my-5">
          <input
            type="radio"
            name="illness"
            checked={haveIllness === false}
            onChange={() => setHaveIllness(false)}
          />
          <svg className="ml-2" viewBox="0 0 64 64" height="2em" width="2em">
            <path
              d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
              pathLength="575.0541381835938"
              className="path"
            />
          </svg>
          <p>هیچ بیماری ندارم</p>
        </label>
      </div>

      {haveIllness && (
        <div className="mt-4">
          <h3>نوع بیماری و دارویی که مصرف می‌کنید را بنویسید:</h3>
          <textarea
            value={bimari}
            onChange={(e) => setBimari(e.target.value)}
            rows={5}
            cols={40}
            className="border p-2 w-full"
          />
        </div>
      )}
    </div>
  );
};

export default Bimari;
