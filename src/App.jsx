// Imports
import { useEffect, useState } from "react";
import SortingPage from "./pages/SortingPage";
import PathfindingPage from "./pages/PathfindingPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SearchingPage from "./pages/SearchingPage";
import CanvasPage from "./pages/CanvasPage";
import "./styles/App.css";

// Components
function App() {
  // Saves which screen the user is currently on
  const [screen, setScreen] = useState(() => {
    return localStorage.getItem("screen") || "home";
  });

  // Saves which page is active inside the main app
  const [activePage, setActivePage] = useState(() => {
    return localStorage.getItem("activePage") || "sorting";
  });

  // Saves the local display name
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "";
  });

  // Local storage
  useEffect(() => {
    localStorage.setItem("screen", screen);
  }, [screen]);

  useEffect(() => {
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  // Navigation
  const goHome = () => {
    setScreen("home");
    setActivePage("sorting");
  };

  if (screen === "home") {
    return <HomePage onEnter={() => setScreen("login")} />;
  }

  if (screen === "login") {
    return (
      <LoginPage
        onLogin={(name) => {
          setUsername(name);
          setScreen("app");
          setActivePage("sorting");
        }}
      />
    );
  }

  // Main application UI
  return (
    <div className="app">
      <header className="top-navbar">
        <div className="brand">
          <h1>Algorithm Explorer</h1>
          <span>Web-Based Algorithm Visualization System</span>
        </div>

        <nav className="nav-buttons">
          <button onClick={goHome}>
            Home
          </button>

          <button
            className={activePage === "sorting" ? "active" : ""}
            onClick={() => setActivePage("sorting")}
          >
            Sorting
          </button>

          <button
            className={activePage === "searching" ? "active" : ""}
            onClick={() => setActivePage("searching")}
          >
            Searching
          </button>

          <button
            className={activePage === "pathfinding" ? "active" : ""}
            onClick={() => setActivePage("pathfinding")}
          >
            Pathfinding
          </button>

          {/* Theory page */}
          <button
            className={activePage === "theory" ? "active" : ""}
            onClick={() => setActivePage("theory")}
          >
            Theory
          </button>

          <button
            className={activePage === "canvas" ? "active" : ""}
            onClick={() => setActivePage("canvas")}
          >
            Canvas
          </button>

          {/* About page */}
          <button
            className={activePage === "about" ? "active" : ""}
            onClick={() => setActivePage("about")}
          >
            About
          </button>
        </nav>

        <div className="nav-actions">
          <div className="user-pill">
            Logged in as {username}
          </div>
        </div>
      </header>

      <main>
        {activePage === "sorting" && <SortingPage />}
        {activePage === "searching" && <SearchingPage />}
        {activePage === "pathfinding" && <PathfindingPage />}
        {activePage === "canvas" && <CanvasPage />}

        {activePage === "theory" && (
          <section className="page-section theory-section">
            <h2>Algorithm Theory</h2>

            <p>
              This section explains the basic terms used in the visualizations.
            </p>

            <div className="theory-grid">
              <div className="theory-card">
                <h3>Time Complexity</h3>
                <p>
                  Time complexity describes how the running time of an algorithm
                  grows as the input size becomes larger.
                </p>
                <span>Example: O(n), O(n²), O(V + E)</span>
              </div>

              <div className="theory-card">
                <h3>Space Complexity</h3>
                <p>
                  Space complexity describes how much extra memory an algorithm
                  needs while it runs.
                </p>
                <span>Example: O(n), O(V)</span>
              </div>

              <div className="theory-card">
                <h3>Binary Search</h3>
                <p>
                  Binary Search is a searching algorithm that works on a sorted array.
                  It repeatedly checks the middle value and removes half of the remaining
                  search range.
                </p>
                <span>Time: O(log n), Space: O(1)</span>
              </div>

              <div className="theory-card">
                <h3>Linear Search</h3>
              
                <p>
                  Linear Search checks each value one by one until the target value is found
                  or the array ends.
                </p>
              
                <span>Time: O(n), Space: O(1)</span>
              </div>

              <div className="theory-card">
                <h3>Comparisons</h3>
                <p>
                  A comparison happens when the algorithm checks two values to
                  decide which one should come first.
                </p>
              </div>

              <div className="theory-card">
                <h3>Swaps</h3>
                <p>
                  A swap happens when two values exchange positions in the
                  array.
                </p>
              </div>

              <div className="theory-card">
                <h3>Selection Sort</h3>
              
                <p>
                  Selection Sort repeatedly finds the smallest value and places it into the
                  correct position in the array.
                </p>
              
                <span>Time: O(n²), Space: O(1)</span>
              </div>

              <div className="theory-card">
                <h3>V and E</h3>
                <p>
                  In pathfinding, V means vertices or nodes, and E means edges
                  or connections between nodes.
                </p>
                <span>BFS Time: O(V + E)</span>
              </div>

              <div className="theory-card theory-card-center">
                <h3>Visited Nodes</h3>
                <p>
                  Visited nodes are the grid cells that the pathfinding
                  algorithm has already explored.
                </p>
              </div>
            </div>
          </section>
        )}

        {activePage === "about" && (
          <section className="page-section about-section">
            <h2>About Algorithm Explorer</h2>

            {/* Introduction comment */}
            <div className="about-intro">
              <p>
                Algorithm Explorer is an interactive web-based learning tool designed to
                help users understand how classical algorithms work through step-by-step
                visualisation.
              </p>

              {/* Main learning goals */}
              <div className="learning-points">
                <span>Understand algorithm steps visually</span>
                <span>Compare time and space complexity</span>
                <span>Observe how speed affects visualisation</span>
                <span>Distinguish sorting, searching, and pathfinding behaviour</span>
              </div>
            </div>

            {/* Feature cards */}
            <div className="about-grid">
              <div className="about-card">
                <h3>Sorting Visualizer</h3>
                <p>
                  Watch sorting algorithms compare, swap, and organize values in
                  real time.
                </p>
              </div>

              <div className="about-card">
                <h3>Searching Visualizer</h3>
                <p>
                  Explore how Binary Search checks the middle value and reduces the search
                  range step by step.
                </p>
              </div>

              <div className="about-card">
                <h3>Pathfinding Visualizer</h3>
                <p>
                  Explore how pathfinding algorithms visit nodes and search for a
                  target.
                </p>
              </div>

              <div className="about-card">
                <h3>Interactive Learning</h3>
                <p>
                  Adjust speed, reset examples, and observe each algorithm step
                  by step.
                </p>
              </div>
            </div>

            {/* Privacy message */}
            <p>
              <i>
                This application does not collect personal or sensitive data. The display
                name is stored locally in the browser and is used only for interface
                personalisation.
              </i>
            </p>

          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <span>Algorithm Explorer</span>
        <span>Designed by 100723789 · Built for algorithm visualization and learning</span>
      </footer>
    </div>
  );
}

export default App;
