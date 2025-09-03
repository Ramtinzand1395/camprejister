import { useEffect, useRef, useState } from "react";

const Canvas = ({ onChange }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parentWidth = canvas.parentElement.offsetWidth;

    // اندازه canvas بر اساس عرض والد و DPI صفحه
    canvas.width = parentWidth * window.devicePixelRatio;
    canvas.height = 150 * window.devicePixelRatio;

    const ctx = canvas.getContext("2d");
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX || e.touches[0].clientX, e.nativeEvent.offsetY || e.touches[0].clientY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const x = e.nativeEvent?.offsetX ?? e.touches[0].clientX - canvas.getBoundingClientRect().left;
    const y = e.nativeEvent?.offsetY ?? e.touches[0].clientY - canvas.getBoundingClientRect().top;
    ctx.lineTo(x, y);
    ctx.stroke();
    if (onChange) onChange(canvas.toDataURL("image/png"));
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        className="border border-gray-400 rounded w-full"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      <button onClick={clearCanvas}>پاک کردن</button>
    </>
  );
};

export default Canvas;
