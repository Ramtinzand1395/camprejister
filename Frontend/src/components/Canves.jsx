import { useEffect, useRef, useState } from "react";

const Canvas = ({ onChange }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parentWidth = canvas.parentElement.offsetWidth;

    canvas.width = parentWidth * window.devicePixelRatio;
    canvas.height = 150 * window.devicePixelRatio;

    const ctx = canvas.getContext("2d");
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
    }
  };

  const startDrawing = (e) => {
    e.preventDefault(); // جلوگیری از اسکرول صفحه
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    e.preventDefault(); // جلوگیری از اسکرول صفحه
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    if (onChange) onChange(canvas.toDataURL("image/png"));
  };

  const stopDrawing = (e) => {
    e?.preventDefault();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className="border border-gray-400 rounded w-full touch-none"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      <button
        type="button"
        onClick={clearCanvas}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-2"
      >
        پاک کردن
      </button>
    </>
  );
};

export default Canvas;
