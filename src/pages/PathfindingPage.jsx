// Imports
import { useEffect, useRef, useState } from "react";

// Components
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

const obstacleNodes = [6, 7, 8, 11, 16, 17, 18];

  // Helper functions
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

    // Add all valid neighboring cells
    if (row > 0) neighbors.push(node - cols);
    if (row < rows - 1) neighbors.push(node + cols);
    if (col > 0) neighbors.push(node - 1);
    if (col < cols - 1) neighbors.push(node + 1);

    return neighbors.filter(
      (neighbor) => !obstacleNodes.includes(neighbor)
);


  };
  const getManhattanDistance = (nodeA, nodeB) => {
    const rowA = Math.floor(nodeA / cols);
    const colA = nodeA % cols;

    const rowB = Math.floor(nodeB / cols);
    const colB = nodeB % cols;

    // Calculate distance without diagonal movement
    return Math.abs(rowA - rowB) + Math.abs(colA - colB);

  };
  // Reset state
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

  // Breadth First Search
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

    // Explore nodes level by level
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

    // Animate the visited nodes
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

  // A star search
  const runAStar = async () => {
  const openSet = [startNode];
  const closedSet = new Set();
  const visitedOrder = [];
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


  const cameFrom = {};
  const gScore = {};
  const fScore = {};

  // Set defaults scores for every node
  for (let i = 0; i < rows * cols; i++) {
    gScore[i] = Infinity;
    fScore[i] = Infinity;
  }

  gScore[startNode] = 0;
  fScore[startNode] = getManhattanDistance(startNode, targetNode);

  // Choose the node with the lowest estimated cost
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
    closedSet.add(currentNode);

    for (const neighbor of getNeighbors(currentNode)) {
      if (closedSet.has(neighbor)) continue;
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

  // Animate the visited nodes
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

  // Build the final path from target back to start
  while (current !== undefined) {
    finalPath.unshift(current);

    if (current === startNode) break;

    current = cameFrom[current];
  }

  // Animate the final path
  for (let i = 0; i < finalPath.length; i++) {
    if (stopRef.current) return;

    await waitIfPaused();

    if (stopRef.current) return;

    setPathNodes((prev) => [...prev, finalPath[i]]);

    await delay();

    if (stopRef.current) return;
  }
};

  {/* Controls */}
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

// Click outside popup
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

  // JSX UI
  return (
    <section className="page-section">
      <h2>Pathfinding Algorithms</h2>
      <p>Select and visualize pathfinding algorithms step by step.</p>

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

          {/* complexity grid */}
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

        {/* Stats card */}
        <div className="stats-card">
          <div className="stats-header">
            <h3>Live Statistics</h3>

            {/* Help wrapper */}
            <div className="stats-help-wrapper" ref={statsHelpRef}>
              <button
                className="stats-help-button"
                onClick={() =>
                  setShowStatsHelp(!showStatsHelp)
                }
              >
                ?
              </button>

              {/* help messages */}
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


{/* Controls */}
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

    {/* Button */}
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
        onChange={(e) => setSpeed(Number(e.target.value))}
      />
    </div>
  </div>
</div>
      
      <div className="grid-container visualization-area">
        {Array.from({ length: rows * cols }).map((_, index) => {
          let cellClass = "grid-cell";

      // Add CSS classes depending on the cell type
      if (obstacleNodes.includes(index)) cellClass += " obstacle";
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
          <b className="legend-box obstacle"></b> Obstacle
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
