function HomePage({ onEnter }) {
  return (
    <div className="home-page">
      <div className="overlay">
        <h1>Algorithm Explorer</h1>

        <p>
          Interactive Web-Based Algorithm Visualization System
        </p>

        <button onClick={onEnter}>
          Enter Explorer
        </button>
      </div>
    </div>
  );
}

export default HomePage;