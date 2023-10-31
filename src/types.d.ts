type NoiseType = "white" | "pink" | "brown";

interface NoiseButtonsProps {
  noiseType: NoiseType;
  setNoiseType: React.Dispatch<React.SetStateAction<NoiseType>>;
}

interface PlayButtonProps {
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NoiseProps {
  noiseType: NoiseType;
  audioContext: AudioContext;
  gainNode: GainNode;
}

interface OscilloscopeProps {
  analyserNode: AnalyserNode;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "control-knob": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export {
  NoiseType,
  NoiseButtonsProps,
  PlayButtonProps,
  NoiseProps,
  OscilloscopeProps,
};
