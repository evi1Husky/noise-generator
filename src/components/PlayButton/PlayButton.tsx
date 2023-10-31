import css from "./Button.module.css";
import { PlayButtonProps } from "../../types";

export const PlayButton = ({ playing, setPlaying }: PlayButtonProps) => {
  const handleClick = () => {
    !playing ? setPlaying(true) : setPlaying(false);
  };

  const buttonActive = `${css.button} ${css.buttonActive}`;
  const buttonInactive = `${css.button} ${css.buttonInactive}`;

  return (
    <button
      className={!playing ? buttonInactive : buttonActive}
      onClick={handleClick}
    >
      {!playing ? "play" : "stop"}
    </button>
  );
};
