import { useEffect, useRef, useState } from "react";

function SearchingPage() {
  const [array, setArray] = useState([
    2, 5, 8, 12, 16, 23, 38, 45,
  ]);

  const [target, setTarget] = useState(23);

  const [speed, setSpeed] = useState(50);

  const [activeIndex, setActiveIndex] =
    useState(null);

  const [range, setRange] = useState({
    left: null,
    right: null,
  });

  const [status, setStatus] = useState(
    "Ready to search."
  );

  const [isPaused, setIsPaused] =
    useState(false);

  const [showStatsHelp, setShowStatsHelp] =
    useState(false);

  const [stats, setStats] = useState({
    comparisons: 0,
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

    setActiveIndex(null);

    setRange({
      left: null,
      right: null,
    });

    setStatus("Ready to search.");

    setStats({
      comparisons: 0,
      steps: 0,
    });
  };

  const generateSortedArray = () => {
    resetState();

    const randomArray = Array.from(
      { length: 8 },
      () =>
        Math.floor(Math.random() * 50) + 1
    ).sort((a, b) => a - b);

    setArray(randomArray);

    setTarget(
      randomArray[
        Math.floor(randomArray.length / 2)
      ]
    );
  };

  const resetArray = () => {
    resetState();

    setArray([
      2, 5, 8, 12, 16, 23, 38, 45,
    ]);

    setTarget(23);
  };

  const runBinarySearch = async () => {
    stopRef.current = false;
    pauseRef.current = false;

    setIsPaused(false);
    setShowStatsHelp(false);

    setActiveIndex(null);

    setStatus("Searching...");

    setStats({
      comparisons: 0,
      steps: 0,
    });

    let left = 0;
    let right = array.length - 1;

    const searchTarget = Number(target);

    while (left <= right) {
      if (stopRef.current) return;

      await waitIfPaused();

      if (stopRef.current) return;

      const middle = Math.floor(
        (left + right) / 2
      );

      setRange({ left, right });

      setActiveIndex(middle);

      setStats((prev) => ({
        comparisons:
          prev.comparisons + 1,

        steps: prev.steps + 1,
      }));

      if (array[middle] === searchTarget) {
        setStatus(
          `Target ${searchTarget} found at index ${middle}.`
        );

        await delay();

        return;
      }

      await delay();

      if (array[middle] < searchTarget) {
        left = middle + 1;

        setStatus(
          `${array[middle]} is smaller than ${searchTarget}. Searching right side.`
        );
      } else {
        right = middle - 1;

        setStatus(
          `${array[middle]} is greater than ${searchTarget}. Searching left side.`
        );
      }

      await delay();
    }

    setActiveIndex(null);

    setRange({
      left: null,
      right: null,
    });

    setStatus(
      `Target ${searchTarget} was not found.`
    );
  };

  const togglePause = () => {
    pauseRef.current =
      !pauseRef.current;

    setIsPaused(pauseRef.current);
  };

  useEffect(() => {
    const handleClickOutside = (
      event
    ) => {
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
      <h2>Searching Algorithms</h2>

      <p>
        Select and visualize searching
        algorithms step by step.
      </p>


      <div className="dashboard">
        <div className="info-card">
          <h3>Binary Search</h3>

          <p>
            Binary Search works on a
            sorted array. It repeatedly
            checks the middle value and
            removes half of the remaining
            search range.
          </p>

          <div className="complexity-grid">
            <span>Best: O(1)</span>

            <span>
              Average: O(log n)
            </span>

            <span>
              Worst: O(log n)
            </span>

            <span>Space: O(1)</span>
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
                    algorithm checks the
                    middle value against
                    the target.
                  </p>

                  <p>
                    <strong>
                      Animation Steps:
                    </strong>{" "}
                    The total number of
                    visual actions shown
                    during the search.
                  </p>

                  <p>
                    <strong>
                      Status:
                    </strong>{" "}
                    Shows the current
                    result of the search,
                    including whether the
                    target value was
                    found, not found, or
                    which side of the
                    array is being
                    searched next.
                  </p>
                </div>
              )}
            </div>
          </div>

          <p>
            Comparisons:{" "}
            {stats.comparisons}
          </p>

          <p>
            Animation Steps: {stats.steps}
          </p>

          <p className="status-text">
            Status: {status}
          </p>
        </div>
      </div>

      
      <div className="controls controls-column">
        <div className="control-row">
          <div className="algorithm-label">
            Binary Search
          </div>

          <button
            onClick={runBinarySearch}
          >
            Start Search
          </button>

          <button onClick={togglePause}>
            {isPaused
              ? "Resume"
              : "Pause"}
          </button>

          <button
            onClick={generateSortedArray}
          >
            Random Array
          </button>

          <button onClick={resetArray}>
            Reset
          </button>
        </div>

        <div className="control-row">
          <input
            className="target-input"
            type="number"
            value={target}
            onChange={(e) =>
              setTarget(e.target.value)
            }
          />

          <div className="speed-control">
            <label>
              Speed: {speed}%
            </label>

            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={speed}
              onChange={(e) =>
                setSpeed(
                  Number(e.target.value)
                )
              }
            />
          </div>
        </div>
      </div>
      
      <div className="search-array-container">
        {array.map((value, index) => {
          let boxClass = "search-box";

          if (
            range.left !== null &&
            index >= range.left &&
            index <= range.right
          ) {
            boxClass += " in-range";
          }

          if (index === activeIndex) {
            boxClass += " middle";
          }

          return (
            <div
              key={index}
              className={boxClass}
            >
              <span>{value}</span>

              <small>
                Index {index}
              </small>
            </div>
          );
        })}
      </div>

      <div className="grid-legend">
        <span>
          <b className="legend-box normal"></b>
          Outside Range
        </span>

        <span>
          <b className="legend-box visited"></b>
          Current Range
        </span>

        <span>
          <b className="legend-box target"></b>
          Middle Value
        </span>
      </div>
    </section>
  );
}

export default SearchingPage;
