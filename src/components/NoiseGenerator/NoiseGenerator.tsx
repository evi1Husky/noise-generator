import css from "./NoiseGenerator.module.css";
import { Noise } from "../Noise/Noise";
import { PlayButton } from "../PlayButton/PlayButton";
import { NoiseButtons } from "../NoiseButtons/NoiseButtons";
import { DisplayButtons } from "../DisplayButtons/DisplayButtons";
import { Oscilloscope } from "../Oscilloscope/Oscilloscope";
import { StaticScreen } from "../Static/StaticScreen";
import { BlackScreen } from "../BlackScreen/BlackScreen";
import { useState, useRef, useEffect, ReactComponentElement } from "react";
import { NoiseType, DisplayType } from "../../types";
import "../Knob/knob";
import { checkIfMobileScreen } from "../../utility";

export const NoiseGenerator = () => {
  const [playing, setPlaying] = useState(false);
  const [noiseType, setNoiseType] = useState<NoiseType>("brown");
  const [displayType, setDisplayType] = useState<DisplayType>("waveform");

  const audioContext = useRef(new AudioContext());
  const gainNode = useRef(audioContext.current.createGain());
  const analyserNode = useRef(audioContext.current.createAnalyser());
  const knob = useRef<any>(null);

  const loading = useRef(false);

  useEffect(() => {
    gainNode.current.connect(audioContext.current.destination);
    gainNode.current.connect(analyserNode.current);
    gainNode.current.gain.value = 0.5;
    knob.current.value = gainNode.current.gain.value * 100;
    knob.current.knobEventHandler = () => {
      gainNode.current.gain.value = knob.current.currentValue / 100;
    };
  }, []);

  const switchDisplayType = (displayType: string): JSX.Element => {
    switch (displayType) {
      case "static":
        return <StaticScreen analyserNode={analyserNode.current} />;
      case "waveform":
        return <Oscilloscope analyserNode={analyserNode.current} />;
      default:
        return <BlackScreen />;
    }
  };

  return (
    <main className={css.noiseGenerator}>
      {playing && (
        <Noise
          noiseType={noiseType}
          audioContext={audioContext.current}
          gainNode={gainNode.current}
          loading={loading}
        />
      )}
      {switchDisplayType(displayType)}
      <section className={css.displayButtonsContainer}>
        <DisplayButtons
          displayType={displayType}
          setDisplayType={setDisplayType}
        />
      </section>
      <section className={css.noiseButtonsContainer}>
        <NoiseButtons
          noiseType={noiseType}
          setNoiseType={setNoiseType}
          loading={loading}
        />
      </section>
      <section className={css.playButtonAndKnobContainer}>
        <control-knob
          ref={knob}
          knob-size={checkIfMobileScreen() ? "65" : "59"}
        />
        <PlayButton
          playing={playing}
          setPlaying={setPlaying}
          loading={loading}
        />
      </section>
    </main>
  );
};
