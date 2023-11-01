type NoiseType = "white" | "pink" | "brown" | "grey" | "velvet" | "green";
type DisplayType = "waveform" | "static" | "displayOff";

interface NoiseButtonsProps {
  noiseType: NoiseType;
  setNoiseType: React.Dispatch<React.SetStateAction<NoiseType>>;
}

interface DisplayButtonsProps {
  displayType: DisplayType;
  setDisplayType: React.Dispatch<React.SetStateAction<DisplayType>>;
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

interface CanvasComponentProps {
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
  DisplayType,
  NoiseButtonsProps,
  DisplayButtonsProps,
  PlayButtonProps,
  NoiseProps,
  CanvasComponentProps,
};
