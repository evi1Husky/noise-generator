import { CanvasComponentProps } from "../../types";
import { useRef, useEffect } from "react";

export const Oscilloscope = ({ analyserNode }: CanvasComponentProps) => {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = canvas.current!.getContext("2d", {
      alpha: false,
    }) as CanvasRenderingContext2D;
    analyserNode.fftSize = 1024;
    let frame: number;
    const rect = canvas.current!.getBoundingClientRect();
    const width = (canvas.current!.width =
      rect.width * window.devicePixelRatio);
    const height = (canvas.current!.height =
      rect.height * window.devicePixelRatio);
    canvas.current!.style.width = `${rect.width}px`;
    canvas.current!.style.height = `${rect.height}px`;
    context.fillStyle = "rgb(0,0,0)";
    context.strokeStyle = "rgb(214, 229, 255)";
    context.lineWidth = 2;
  
    const draw = () => {
      frame = window.requestAnimationFrame(draw);
      const numberOfValues = analyserNode.frequencyBinCount;
      const waveformData = new Uint8Array(numberOfValues);
      analyserNode.getByteTimeDomainData(waveformData);
      const waveCenter = height / 2 / 128;
      const xStep = width / numberOfValues;
      let x = 0;
      let y = 0;
      context.clearRect(0, 0, width, height);
      context.beginPath();
      for (let i = 0; i < numberOfValues; i++) {
        y = waveformData[i]! * waveCenter;
        context.lineTo(~~x, ~~y);
        x += xStep;
      }
      context.stroke();
    };

    draw();

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvas}></canvas>;
};
