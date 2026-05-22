import { useEffect, useRef, useState } from "react";

function PathfindingPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bfs");
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [pathNodes, setPathNodes] = useState([]);
  const [speed, setSpeed] = useState(50);
  const [isPaused, setIsPaused] = useState(false);
  const [showStatsHelp, setShowStatsHelp] = useState(false);

  const [stats, setStats] = useState({
    visited: 0,
    steps: 0,
  });

  const stopRef = useRef(false);
  const pauseRef = useRef(false);
  const statsHelpRef = useRef(null);

  const rows = 5;
  const cols = 5;
  const startNode = 0;
  const targetNode = 24;

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

  const getNeighbors = (node) => {
    const neighbors = [];
    const row = Math.floor(node / cols);
    const col = node % cols;

    if (row > 0) neighbors.push(node - cols);
    if (row < rows - 1) neighbors.push(node + cols);
    if (col > 0) neighbors.push(node - 1);
    if (col < cols - 1) neighbors.push(node + 1);

    return neighbors;
  };

  const getManhattanDistance = (nodeA, nodeB) => {
    const rowA = Math.floor(nodeA / cols);
    const colA = nodeA % cols;

    const rowB = Math.floor(nodeB / cols);
    const colB = nodeB % cols;

    return Math.abs(rowA - rowB) + Math.abs(colA - colB);
  };

  const resetState = () => {
    stopRef.current = true;
    pauseRef.current = false;

    setIsPaused(false);
    setShowStatsHelp(false);
    setVisitedNodes([]);
    setPathNodes([]);

    setStats({
      visited: 0,
      steps: 0,
    });
  };

  const runBFS = async () => {
    stopRef.current = false;
    pauseRef.current = false;

    setIsPaused(false);
    setShowStatsHelp(false);
    setVisitedNodes([]);
    setPathNodes([]);

    setStats({
      visited: 0,
      steps: 0,
    });

    const queue = [startNode];
    const visited = new Set([startNode]);
    const visitedOrder = [];

    while (queue.length > 0) {
      const currentNode = queue.shift();
      visitedOrder.push(currentNode);

      if (currentNode === targetNode) break;

      for (const neighbor of getNeighbors(currentNode)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    for (let i = 0; i < visitedOrder.length; i++) {
      if (stopRef.current) return;

      await waitIfPaused();

      if (stopRef.current) return;

      setVisitedNodes((prev) => [...prev, visitedOrder[i]]);

      setStats((prev) => ({
        visited: prev.visited + 1,
        steps: prev.steps + 1,
      }));

      await delay();

      if (stopRef.current) return;
    }
  };

  const runAStar = async () => {
  stopRef.current = false;
  pauseRef.current = false;

  setIsPaused(false);
  setShowStatsHelp(false);
  setVisitedNodes([]);
  setPathNodes([]);

  setStats({
    visited: 0,
    steps: 0,
  });

  const openSet = [startNode];
  const visitedOrder = [];

  const cameFrom = {};
  const gScore = {};
  const fScore = {};

  for (let i = 0; i < rows * cols; i++) {
    gScore[i] = Infinity;
    fScore[i] = Infinity;
  }

  gScore[startNode] = 0;
  fScore[startNode] = getManhattanDistance(startNode, targetNode);

  while (openSet.length > 0) {
    let currentNode = openSet[0];

    for (const node of openSet) {
      if (fScore[node] < fScore[currentNode]) {
        currentNode = node;
      }
    }

    visitedOrder.push(currentNode);

    if (currentNode === targetNode) {
      break;
    }

    openSet.splice(openSet.indexOf(currentNode), 1);

    for (const neighbor of getNeighbors(currentNode)) {
      const tentativeGScore = gScore[currentNode] + 1;

      if (tentativeGScore < gScore[neighbor]) {
        cameFrom[neighbor] = currentNode;
        gScore[neighbor] = tentativeGScore;
        fScore[neighbor] =
          tentativeGScore + getManhattanDistance(neighbor, targetNode);

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  for (let i = 0; i < visitedOrder.length; i++) {
    if (stopRef.current) return;

    await waitIfPaused();

    if (stopRef.current) return;

    setVisitedNodes((prev) => [...prev, visitedOrder[i]]);

    setStats((prev) => ({
      visited: prev.visited + 1,
      steps: prev.steps + 1,
    }));

    await delay();

    if (stopRef.current) return;
  }

  const finalPath = [];
  let current = targetNode;

  while (current !== undefined) {
    finalPath.unshift(current);

    if (current === startNode) break;

    current = cameFrom[current];
  }

  for (let i = 0; i < finalPath.length; i++) {
    if (stopRef.current) return;

    await waitIfPaused();

    if (stopRef.current) return;

    setPathNodes((prev) => [...prev, finalPath[i]]);

    await delay();

    if (stopRef.current) return;
  }
};

  const runAlgorithm = () => {
    if (selectedAlgorithm === "bfs") {
      runBFS();
    }

    if (selectedAlgorithm === "astar") {
      runAStar();
    }
  };

  const togglePause = () => {
    pauseRef.current = !pauseRef.current;
    setIsPaused(pauseRef.current);
  };

  const resetGrid = () => {
    resetState();
  };

useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      statsHelpRef.current &&
      !statsHelpRef.current.contains(event.target)
    ) {
      setShowStatsHelp(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <section className="page-section">
      <h2>Pathfinding Algorithms</h2>
      <p>Select and visualize pathfinding algorithms step by step.</p>

      <div className="controls controls-column">
      <div className="control-row">
        <select
          value={selectedAlgorithm}
          onChange={(e) => {
            resetState();
            setSelectedAlgorithm(e.target.value);
          }}
        >
          <option value="bfs">Breadth First Search</option>
          <option value="astar">A* Search</option>
        </select>

        <button onClick={runAlgorithm}>Start Algorithm</button>

        <button onClick={togglePause}>
          {isPaused ? "Resume" : "Pause"}
        </button>

        <button onClick={resetGrid}>Reset Grid</button>
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
      </div>
    </div>

      <div className="dashboard">
        <div className="info-card">
          <h3>
            {selectedAlgorithm === "bfs"
              ? "Breadth First Search"
              : "A* Search"}
          </h3>

          <p>
            {selectedAlgorithm === "bfs"
              ? "Breadth First Search explores nodes level by level. It checks all neighboring nodes before moving deeper into the grid."
              : "A* Search uses a heuristic to estimate the distance to the target and prioritizes the most promising nodes first."}
          </p>

          <div className="complexity-grid">
            <span>
              Time:{" "}
              {selectedAlgorithm === "bfs"
                    ? "O(V + E)"
                    : "O(V² + E)"}
            </span>

            <span>Space: O(V)</span>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-header">
            <h3>Live Statistics</h3>

            <div className="stats-help-wrapper" ref={statsHelpRef}>
              <button
                className="stats-help-button"
                onClick={() =>
                  setShowStatsHelp(!showStatsHelp)
                }
              >
                ?
              </button>

              {showStatsHelp && (
                <div className="stats-help-popup">
                  <p>
                    <strong>Visited Nodes:</strong> The grid
                    cells that the algorithm has explored while
                    searching for the target.
                  </p>

                  <p>
                    <strong>Animation Steps:</strong> The total
                    number of visual actions shown on screen
                    during the pathfinding process.
                  </p>
                </div>
              )}
            </div>
          </div>

          <p>Visited Nodes: {stats.visited}</p>
          <p>Animation Steps: {stats.steps}</p>
        </div>
      </div>

      <div className="grid-container">
        {Array.from({ length: rows * cols }).map((_, index) => {
          let cellClass = "grid-cell";

      if (visitedNodes.includes(index)) cellClass += " visited";
      if (pathNodes.includes(index)) cellClass += " path";
      if (index === startNode) cellClass += " start";
      if (index === targetNode) cellClass += " target";

          return <div key={index} className={cellClass}></div>;
        })}
      </div>

      <div className="grid-legend">
        <span>
          <b className="legend-box start"></b> Start
        </span>

        <span>
          <b className="legend-box target"></b> Target
        </span>

        <span>
          <b className="legend-box visited"></b> Visited
        </span>

        <span>
          <b className="legend-box path"></b> Final Path
        </span>

        <span>
          <b className="legend-box normal"></b> Unvisited
        </span>
      </div>
    </section>
  );
}

export default PathfindingPage;