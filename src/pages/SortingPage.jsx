import { useEffect, useRef, useState } from "react";
import { generateBubbleSortSteps } from "../algorithms/sorting/bubbleSort";
import { generateQuickSortSteps } from "../algorithms/sorting/quickSort";
import { generateMergeSortSteps } from "../algorithms/sorting/mergeSort";

const algorithmInfo = {
  bubble: {
    name: "Bubble Sort",
    description:
      "Bubble Sort repeatedly compares adjacent values and swaps them when they are in the wrong order.",
    best: "O(n²)",
    average: "O(n²)",
    worst: "O(n²)",
  },

  quick: {
    name: "Quick Sort",
    description:
      "Quick Sort uses a pivot to divide the array into smaller parts and sorts them recursively.",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n²)",
  },

  merge: {
    name: "Merge Sort",
    description:
      "Merge Sort divides the array into smaller parts, sorts them, and then merges them back together.",
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
  },
};

function SortingPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState("bubble");

  const [array, setArray] = useState([
    5, 3, 8, 1, 2, 7,
  ]);

  const [arraySize, setArraySize] = useState(8);

  const [speed, setSpeed] = useState(50);

  const [activeIndices, setActiveIndices] =
    useState([]);

  const [isPaused, setIsPaused] = useState(false);

  const [showStatsHelp, setShowStatsHelp] =
    useState(false);

  const [stats, setStats] = useState({
    comparisons: 0,
    swaps: 0,
    steps: 0,
  });

  const pauseRef = useRef(false);
  const stopRef = useRef(false);
  const statsHelpRef = useRef(null);

  const delay = () =>
    new Promise((resolve) =>
      setTimeout(resolve, 1050 - speed * 10)
    );

  const waitIfPaused = async () => {
    while (pauseRef.current) {
      await new Promise((resolve) =>
        setTimeout(resolve, 100)
      );
    }
  };

  const resetState = () => {
    stopRef.current = true;
    pauseRef.current = false;

    setIsPaused(false);
    setShowStatsHelp(false);
    setActiveIndices([]);

    setStats({
      comparisons: 0,
      swaps: 0,
      steps: 0,
    });
  };

  const generateRandomArray = () => {
    resetState();

    const randomArray = Array.from(
      { length: arraySize },
      () => Math.floor(Math.random() * 10) + 1
    );

    setArray(randomArray);
  };

  const resetArray = () => {
    resetState();

    setArray([5, 3, 8, 1, 2, 7]);
  };

  const runAlgorithm = async () => {
    stopRef.current = false;
    pauseRef.current = false;

    setIsPaused(false);
    setShowStatsHelp(false);
    setActiveIndices([]);

    setStats({
      comparisons: 0,
      swaps: 0,
      steps: 0,
    });

    let steps = [];

    if (selectedAlgorithm === "bubble") {
      steps = generateBubbleSortSteps(array);
    }

    if (selectedAlgorithm === "quick") {
      steps = generateQuickSortSteps(array);
    }

    if (selectedAlgorithm === "merge") {
      steps = generateMergeSortSteps(array);
    }

    for (const step of steps) {
      if (stopRef.current) return;

      await waitIfPaused();

      if (stopRef.current) return;

      setActiveIndices(step.indices);
      setArray(step.array);

      setStats((prev) => ({
        comparisons:
          step.type === "compare"
            ? prev.comparisons + 1
            : prev.comparisons,

        swaps:
          step.type === "swap" || step.type === "overwrite"
            ? prev.swaps + 1
            : prev.swaps,

        steps: prev.steps + 1,
      }));

      await delay();

      if (stopRef.current) return;
    }

    setActiveIndices([]);
  };

  const togglePause = () => {
    pauseRef.current = !pauseRef.current;
    setIsPaused(pauseRef.current);
  };

  const info = algorithmInfo[selectedAlgorithm];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        statsHelpRef.current &&
        !statsHelpRef.current.contains(
          event.target
        )
      ) {
        setShowStatsHelp(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <section className="page-section">
      <h2>Sorting Algorithms</h2>

      <p>
        Select and visualize sorting algorithms step
        by step.
      </p>



      <div className="dashboard">
        <div className="info-card">
          <h3>{info.name}</h3>

          <p>{info.description}</p>

          <div className="complexity-grid">
            <span>Best: {info.best}</span>

            <span>
              Average: {info.average}
            </span>

            <span>Worst: {info.worst}</span>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-header">
            <h3>Live Statistics</h3>

            <div
              className="stats-help-wrapper"
              ref={statsHelpRef}
            >
              <button
                className="stats-help-button"
                onClick={() =>
                  setShowStatsHelp(
                    !showStatsHelp
                  )
                }
              >
                ?
              </button>

              {showStatsHelp && (
                <div className="stats-help-popup">
                  <p>
                    <strong>
                      Comparisons:
                    </strong>{" "}
                    How many times the
                    algorithm checks two
                    values to see which one
                    is bigger or smaller.
                  </p>

                  <p>
                    <strong>Swaps/Writes:</strong>{" "}
                    How many times two
                    values change position
                    or are written back
                    in the array.
                  </p>

                  <p>
                    <strong>
                      Animation Steps:
                    </strong>{" "}
                    The total number of
                    visual actions shown on
                    screen, such as
                    highlighting,
                    comparing, or swapping
                    bars.
                  </p>
                </div>
              )}
            </div>
          </div>

          <p>
            Comparisons: {stats.comparisons}
          </p>

          <p>Swaps/Writes: {stats.swaps}</p>

          <p>
            Animation Steps: {stats.steps}
          </p>
        </div>
      </div>
            <div className="controls controls-column">
        <div className="control-row">
          <select
            value={selectedAlgorithm}
            onChange={(e) => {
              resetState();
              setSelectedAlgorithm(
                e.target.value
              );
            }}
          >
            <option value="bubble">
              Bubble Sort
            </option>

            <option value="quick">
              Quick Sort
            </option>

            <option value="merge">
              Merge Sort
            </option>
          </select>

          <button onClick={runAlgorithm}>
            Start Algorithm
          </button>

          <button onClick={togglePause}>
            {isPaused ? "Resume" : "Pause"}
          </button>

          <button onClick={generateRandomArray}>
            Random Array
          </button>

          <button onClick={resetArray}>
            Reset
          </button>
        </div>

        <div className="control-row">
          <div className="speed-control">
            <label>Speed: {speed}%</label>

            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={speed}
              onChange={(e) =>
                setSpeed(Number(e.target.value))
              }
            />
          </div>

          <div className="speed-control">
            <label>Size: {arraySize}</label>

            <input
              type="range"
              min="4"
              max="12"
              step="1"
              value={arraySize}
              onChange={(e) => {
                resetState();

                const newSize = Number(
                  e.target.value
                );

                setArraySize(newSize);

                const newArray = Array.from(
                  { length: newSize },
                  () =>
                    Math.floor(
                      Math.random() * 10
                    ) + 1
                );

                setArray(newArray);
              }}
            />
          </div>
        </div>
      </div>
      <div className="bars-container">
        {array.map((value, index) => (
          <div
            key={index}
            className="bar-wrapper"
          >
            <div
              className={`array-bar ${
                activeIndices.includes(index)
                  ? "active-bar"
                  : ""
              }`}
              style={{
                height: `${value * 35}px`,
              }}
            ></div>

            <span>{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SortingPage;
