// Components
function HomePage({ onEnter }) {
  return (
    <div className="home-page">
      <div className="overlay">
        <h1>Algorithm Explorer</h1>

        // Description
        <p>
          Interactive Web-Based Algorithm Visualization System
        </p>

        // button to enter the application
        <button onClick={onEnter}>
          Enter Explorer
        </button>
      </div>
    </div>
  );
}

export default HomePage;
