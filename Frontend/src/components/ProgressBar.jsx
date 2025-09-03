import React, { useEffect, useState } from "react";

const ProgressBar = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;

    if (isLoading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) return prev + 5; // تا ۹۰٪ پر میشه
          return prev;
        });
      }, 200);
    } else {
      setProgress(100);
      setTimeout(() => setProgress(0), 1000); // بعد از لود کامل صفر میشه
    }

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-50">
      <div
        className="h-full bg-blue-600 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
