import { useState } from "react";
import Canvas from "./components/Canvas";
import ColorPicker from "./components/ColorPicker";

const DrawingGame = () => {
  const [color, setColor] = useState("#000000");
  const [lines, setLines] = useState([]);

  const handleColorChange = (color, event) => {
    setColor(color.hex);
  };

  const handleClear = () => {
    setLines([]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      <ColorPicker color={color} handleChange={handleColorChange} handleClear={handleClear} />
      <Canvas color={color} lines={lines} setLines={setLines} />
    </div>
  );
};

export default DrawingGame;
