import css from "./NoiseGenerator.module.css";
import { Noise } from "../Noise/Noise";
import { PlayButton } from "../PlayButton/PlayButton";
import { NoiseButtons } from "../NoiseButtons/NoiseButtons";
import { useState, useRef, useEffect } from "react";
import { NoiseType } from "../../types";
import "../Knob/knob"

export const NoiseGenerator = () => {
  const [playing, setPlaying] = useState(false);
  const [noiseType, setNoiseType] = useState<NoiseType>("brown");

  const audioContext = useRef(new AudioContext());
  const gainNode = useRef(audioContext.current.createGain());
  const analyserNode = useRef(audioContext.current.createAnalyser());
  const knob = useRef<any>(null);

  useEffect(() => {
    gainNode.current.connect(audioContext.current.destination);
    gainNode.current.connect(analyserNode.current);
    gainNode.current.gain.value = 0.5;
    knob.current.value = gainNode.current.gain.value * 100;
    knob.current.knobEventHandler = () => {
      gainNode.current.gain.value = knob.current.currentValue / 100;
    };
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
        <control-knob ref={knob} knob-size="68" />
        <PlayButton playing={playing} setPlaying={setPlaying} />
      </section>
    </main>
  );
};
