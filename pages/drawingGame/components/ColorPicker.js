import { ChromePicker } from "react-color";
import ClearButton from "./ClearButton";
import styles from "./ColorPicker.module.css";

const ColorPicker = ({ color, handleChange, handleClear }) => {
  return (
    <div className={styles.colorPicker}>
      <ChromePicker color={color} onChangeComplete={handleChange} />
      <ClearButton onClick={handleClear} />
    </div>
  );
};

export default ColorPicker;