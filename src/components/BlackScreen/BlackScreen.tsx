import { useRef, useEffect } from "react";

export const BlackScreen = () => {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = canvas.current!.getContext("2d", {
      alpha: false,
    }) as CanvasRenderingContext2D;
    const rect = canvas.current!.getBoundingClientRect();
    const width = (canvas.current!.width =
      rect.width * window.devicePixelRatio);
    const height = (canvas.current!.height =
      rect.height * window.devicePixelRatio);
    canvas.current!.style.width = `${rect.width}px`;
    canvas.current!.style.height = `${rect.height}px`;
    context.fillStyle = "rgb(0,0,0)";
    context.clearRect(0, 0, width, height);

  }, []);
  return <canvas ref={canvas}></canvas>;
};
