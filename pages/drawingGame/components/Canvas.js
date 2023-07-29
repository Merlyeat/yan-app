import { useEffect, useRef, useState } from "react";
import ClearButton from './ClearButton';
import styles from './Canvas.module.css';

const Canvas = ({ color, lines, setLines }) => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentLine, setCurrentLine] = useState(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
  
      const pixelRatio = window.devicePixelRatio;
      canvas.style.width = `${canvas.offsetWidth}px`;
      canvas.style.height = `${canvas.offsetHeight}px`;
      canvas.width = canvas.offsetWidth * pixelRatio;
      canvas.height = canvas.offsetHeight * pixelRatio;
  
      context.scale(pixelRatio, pixelRatio);
      context.lineCap = "round";
      context.lineWidth = 5;
      contextRef.current = context;
  
      redraw(context);
    }, [color, lines]);
  
    const redraw = (context) => {
      for (let line of lines) {
        const { color, points } = line;
        context.strokeStyle = color;
        context.beginPath();
        const [firstPoint, ...restOfPoints] = points;
        context.moveTo(firstPoint.x, firstPoint.y);
        for (let point of restOfPoints) {
          context.lineTo(point.x, point.y);
        }
        context.stroke();
      }
    }
  
    const startDrawing = ({ nativeEvent }) => {
      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.strokeStyle = color;
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
      setCurrentLine({ color: color, points: [{x: offsetX, y: offsetY}]});
    };
  
    const finishDrawing = () => {
      contextRef.current.closePath();
      setIsDrawing(false);
      setLines([...lines, currentLine]);
      setCurrentLine(null);
    };
  
    const draw = ({ nativeEvent }) => {
      if (!isDrawing) {
        return;
      }
      const { offsetX, offsetY } = nativeEvent;
      contextRef.current.strokeStyle = color;
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
      setCurrentLine({...currentLine, points: [...currentLine.points, {x: offsetX, y: offsetY}]});
    };
  
    return (
      <div className={styles.canvasContainer}>
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          className={styles.canvas}
        />
      </div>
    );
  };
  
  export default Canvas;