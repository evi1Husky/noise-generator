import buttonCSS from "../PlayButton/Button.module.css";
import containerCSS from "./DisplayButtons.module.css";
import { DisplayButtonsProps, DisplayType } from "../../types";

export const DisplayButtons = ({
  displayType,
  setDisplayType,
}: DisplayButtonsProps) => {
  const buttonActive = `${buttonCSS.button} ${buttonCSS.buttonActive}`;
  const buttonInactive = `${buttonCSS.button} ${buttonCSS.buttonInactive}`;

  const waveform = displayType === "waveform" ? buttonActive : buttonInactive;
  const staticScreen = displayType === "static" ? buttonActive : buttonInactive;
  const displayOff =
    displayType === "displayOff" ? buttonActive : buttonInactive;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonValue = (event.target as HTMLButtonElement)
      .value as DisplayType;
    displayType !== buttonValue ? setDisplayType(buttonValue) : null;
  };

  return (
    <section className={containerCSS.displayButtonsRow}>
      <button
        value="waveform"
        className={`${waveform} ${buttonCSS.smallFontSize}`}
        onClick={handleClick}
      >
        waveform
      </button>
      <button value="static" className={staticScreen} onClick={handleClick}>
        static
      </button>
      <button
        value="displayOff"
        className={`${displayOff} ${buttonCSS.mediumFontSize}`}
        onClick={handleClick}
      >
        display off
      </button>
    </section>
  );
};
