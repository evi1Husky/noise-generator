import buttonCSS from "../PlayButton/Button.module.css";
import containerCSS from "./NoiseButtons.module.css";
import { NoiseButtonsProps, NoiseType } from "../../types";

export const NoiseButtons = ({
  noiseType,
  setNoiseType,
  loading,
}: NoiseButtonsProps) => {
  const buttonActive = `${buttonCSS.button} ${buttonCSS.buttonActive}`;
  const buttonInactive = `${buttonCSS.button} ${buttonCSS.buttonInactive}`;

  const white = noiseType === "white" ? buttonActive : buttonInactive;
  const pink = noiseType === "pink" ? buttonActive : buttonInactive;
  const brown = noiseType === "brown" ? buttonActive : buttonInactive;
  const grey = noiseType === "grey" ? buttonActive : buttonInactive;
  const velvet = noiseType === "velvet" ? buttonActive : buttonInactive;
  const green = noiseType === "green" ? buttonActive : buttonInactive;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!loading.current) {
      const buttonValue = (event.target as HTMLButtonElement)
        .value as NoiseType;
      noiseType !== buttonValue ? setNoiseType(buttonValue) : null;
    }
  };

  return (
    <>
      <section className={containerCSS.noiseButtonRow}>
        <button value="white" className={white} onClick={handleClick}>
          white
        </button>
        <button value="pink" className={pink} onClick={handleClick}>
          pink
        </button>
        <button value="brown" className={brown} onClick={handleClick}>
          brown
        </button>
      </section>
      <section className={containerCSS.noiseButtonRow}>
        <button value="grey" className={grey} onClick={handleClick}>
          grey
        </button>
        <button value="velvet" className={velvet} onClick={handleClick}>
          velvet
        </button>
        <button value="green" className={green} onClick={handleClick}>
          green
        </button>
      </section>
    </>
  );
};
