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

export { NoiseType, NoiseButtonsProps, PlayButtonProps, NoiseProps };
