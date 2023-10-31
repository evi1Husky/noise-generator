import css from "./NoiseGenerator.module.css";
import { Noise } from "../Noise/Noise";
import { PlayButton } from "../PlayButton/PlayButton";
import { NoiseButtons } from "../NoiseButtons/NoiseButtons";
import { useState, useRef, useEffect } from "react";
import { NoiseType } from "../../types";

export const NoiseGenerator = () => {
  const [playing, setPlaying] = useState(false);
  const [noiseType, setNoiseType] = useState<NoiseType>("brown");

  const audioContext = useRef(new AudioContext());
  const gainNode = useRef(audioContext.current.createGain());
  const analyserNode = useRef(audioContext.current.createAnalyser());

  useEffect(() => {
    gainNode.current.connect(audioContext.current.destination);
    gainNode.current.connect(analyserNode.current);
    gainNode.current.gain.value = 0.5;
  }, []);

  return (
    <main className={css.noiseGenerator}>
      {playing && (
        <Noise
          noiseType={noiseType}
          audioContext={audioContext.current}
          gainNode={gainNode.current}
        />
      )}
      <section className={css.noiseButtonsContainer}>
        <NoiseButtons noiseType={noiseType} setNoiseType={setNoiseType} />
      </section>
      <section className={css.playButtonAndKnobContainer}>
        <PlayButton playing={playing} setPlaying={setPlaying} />
      </section>
    </main>
  );
};
