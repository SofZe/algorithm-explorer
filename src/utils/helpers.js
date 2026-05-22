import "./styles/App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Algorithm Explorer</h1>
        <p>Web-Based Algorithm Visualization System</p>
      </header>

      <main className="main-layout">
        <aside className="sidebar">
          <h2>Algorithm</h2>

          <select>
            <option>Bubble Sort</option>
            <option>Quick Sort</option>
            <option>Merge Sort</option>
            <option>Binary Search</option>
            <option>BFS</option>
            <option>A*</option>
          </select>

          <h2>Input</h2>
          <button>Randomize Input</button>
        </aside>

        <section className="visualization-area">
          <h2>Visualization Area</h2>
          <div className="placeholder">
            Bars / Grid will appear here
          </div>
        </section>

        <aside className="controls">
          <h2>Controls</h2>
          <button>Play</button>
          <button>Pause</button>
          <button>Next Step</button>
          <button>Reset</button>

          <label>
            Speed
            <input type="range" min="100" max="1000" />
          </label>
        </aside>
      </main>
    </div>
  );
}

export default App;