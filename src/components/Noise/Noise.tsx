import { NoiseProps, NoiseType } from "../../types";
import { useEffect } from "react";

export const Noise = ({ noiseType, audioContext, gainNode, loading }: NoiseProps) => {
  const sampleRate = audioContext.sampleRate * 120;

  /*
    to use multiple web workers concurrently make an array of promises with
    worker factory functions then resolve it with Promise.allSettled()
  */
  async function makeNoiseBuffer(
    type: NoiseType,
    sampleRate: number
  ): Promise<Float32Array> {
    const worker = new Worker(new URL("./noiseWorker", import.meta.url), {
      type: "module",
    });
    worker.postMessage({ type, sampleRate });
    return new Promise((res) => {
      worker.onmessage = (e: MessageEvent) => {
        Object.defineProperty(e.data, "type", {
          value: type,
          enumerable: true,
        });
        worker.terminate();
        res(e.data);
      };
    });
  }

  useEffect(() => {
    loading.current = true
    const buffers: Promise<Float32Array>[] = [
      makeNoiseBuffer(noiseType, sampleRate),
      makeNoiseBuffer(noiseType, sampleRate),
    ];
    const noise = audioContext.createBufferSource();
    const buffer = audioContext.createBuffer(
      2,
      sampleRate,
      audioContext.sampleRate
    );
    Promise.allSettled(buffers).then((values: any): void => {
      buffer.copyToChannel(values[0].value, 0);
      buffer.copyToChannel(values[1].value, 1);
      noise.buffer = buffer;
      noise.connect(gainNode);
      noise.loop = true;
      noise.start(0);
      loading.current = false;
    });
    return () => {
      noise.stop();
      noise.disconnect();
    };
  }, [noiseType]);

  return null;
};
