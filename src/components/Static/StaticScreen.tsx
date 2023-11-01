import { CanvasComponentProps } from "../../types";
import { useRef, useEffect } from "react";

export const StaticScreen = ({ analyserNode }: CanvasComponentProps) => {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = canvas.current!.getContext("2d", {
      willReadFrequently: true,
    }) as CanvasRenderingContext2D;
    analyserNode.fftSize = 1024;
    let frame: number;
    const rect = canvas.current!.getBoundingClientRect();
    canvas.current!.width = Math.round(
      (rect.width * window.devicePixelRatio) / 2
    );
    canvas.current!.height = Math.round(
      (rect.height * window.devicePixelRatio) / 2
    );
    canvas.current!.style.width = `${rect.width}px`;
    canvas.current!.style.height = `${rect.height}px`;
    context.fillStyle = "rgb(212, 240, 255)";
    context.fillRect(0, 0, canvas.current!.width, canvas.current!.height);
    const imageData = context.getImageData(
      0,
      0,
      canvas.current!.width,
      canvas.current!.height
    );

    const draw = () => {
      frame = window.requestAnimationFrame(draw);
      const waveformData = new Uint8Array(analyserNode.frequencyBinCount);
      analyserNode.getByteTimeDomainData(waveformData);
      context.putImageData(drawLoop(imageData, waveformData), 0, 0);
    };

    const drawLoop = (
      imageData: ImageData,
      waveformData: Uint8Array
    ): ImageData => {
      const length = imageData.data.length;
      const numberOfValues = waveformData.length;
      for (let i = 3; i < length; i += 4) {
        imageData.data[i] = waveformData[(Math.random() * numberOfValues) | 0]!;
        if (imageData.data[i]! > 125) {
          imageData.data[i] = 0;
        } else {
          imageData.data[i] *= 4;
        }
      }
      return imageData;
    };

    draw();
    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvas}></canvas>;
};
