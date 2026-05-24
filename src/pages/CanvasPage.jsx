// Imports
import { useEffect, useRef, useState } from "react";

// Components
function CanvasPage() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const values = [20, 45, 30, 70, 55, 90, 40, 65];

  const [currentStep, setCurrentStep] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);

  // Draw canvas
  const drawCanvas = (activeIndex = -1) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Clear the canvas before drawing again
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#e5e7eb";
    ctx.font = "18px Arial";
    ctx.fillText("Canvas-based Step-by-Step Visualization Demo", 24, 34);

    // Draw each value as a bar on the canvas
    values.forEach((value, index) => {
      const x = 50 + index * 80;
      const barHeight = value * 3;
      const y = canvas.height - barHeight - 50;

      ctx.fillStyle = index === activeIndex ? "#ef4444" : "#2563eb";
      ctx.fillRect(x, y, 45, barHeight);

      ctx.fillStyle = "#f8fafc";
      ctx.font = "14px Arial";
      ctx.fillText(value, x + 10, canvas.height - 25);
    });

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "14px Arial";

    // Show text depending on the current step
    if (activeIndex >= 0) {
      ctx.fillText(
        `Step ${activeIndex + 1}: highlighting value ${values[activeIndex]}`,
        24,
        64
      );
    } else {
      ctx.fillText("Press Next Step or Play to begin.", 24, 64);
    }
  };

  const nextStep = () => {
    setIsRunning(false);

    if (animationRef.current) {
      clearInterval(animationRef.current);
    }

    // Move to the next bar manually
    setCurrentStep((prev) => {
      const next = prev + 1 >= values.length ? 0 : prev + 1;
      drawCanvas(next);
      return next;
    });
  };

  // Animation controls
  const startAnimation = () => {
    if (animationRef.current) {
      clearInterval(animationRef.current);
    }

    setIsRunning(true);

    // Automatically move through the steps
    animationRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev + 1;

        if (next >= values.length) {
          clearInterval(animationRef.current);
          setIsRunning(false);
          drawCanvas(-1);
          return -1;
        }

        drawCanvas(next);
        return next;
      });
    }, 700);
  };

  const pauseAnimation = () => {
    setIsRunning(false);

    // Stop the automatic animation
    if (animationRef.current) {
      clearInterval(animationRef.current);
    }
  };

  const resetAnimation = () => {
    setIsRunning(false);
    setCurrentStep(-1);

    if (animationRef.current) {
      clearInterval(animationRef.current);
    }

    // Return the canvas to the starting state
    drawCanvas(-1);
  };

  useEffect(() => {

    // Draw the first empty state when the page loads
    drawCanvas(-1);

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, []);

  return (
    <section className="page-section">
      <h2>Canvas Visualization Demo</h2>

      <p>
        This page demonstrates the use of the HTML Canvas API for drawing
        algorithm-style visual elements with manual step-by-step and automatic
        animation controls.
      </p>

      <div className="controls controls-column">
        <div className="control-row">
          <button onClick={startAnimation}>
            {isRunning ? "Playing" : "Play"}
          </button>

          <button onClick={pauseAnimation}>Pause</button>

          <button onClick={nextStep}>Next Step</button>

          <button onClick={resetAnimation}>Reset</button>
        </div>
      </div>

      <div className="canvas-wrapper">
        <canvas
          ref={canvasRef}
          width="760"
          height="360"
          className="algorithm-canvas"
        ></canvas>
      </div>

      <div className="grid-legend">
        <span>
          <b className="legend-box visited"></b> Normal Bar
        </span>

        <span>
          <b className="legend-box target"></b> Active Step
        </span>
      </div>
    </section>
  );
}

export default CanvasPage;
