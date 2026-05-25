# Algorithm Explorer

Algorithm Explorer is a web-based algorithm visualisation system.

This project helps users to understand how common algorithms work through simple visual examples, animations, controls, and explanations.

### 1. Live Website

The deployed version of the project is available here:

https://sofze.github.io/algorithm-explorer/

### 2. GitHub Repository

https://github.com/SofZe/algorithm-explorer

### 3. Main Features

The application includes:

- Sorting algorithm visualisations
- Searching algorithm visualisations
- Pathfinding algorithm visualisations
- Theory page with basic algorithm terms
- About page with project purpose and learning outcomes
- Canvas page
- Live statistics
- Speed control
- Pause and resume controls
- Reset controls
- Random input generation
- Responsive design for smaller screens
- Obstacle-based pathfinding grid

### 4. Algorithms Included

#### 4.1 Sorting Algorithms

The sorting page includes:

- Bubble Sort
- Quick Sort
- Merge Sort
- Selection Sort

Users can generate a random array, change the array size, start the animation, pause or resume it, reset it, and change the animation speed.

The visualisation highlights active bars during comparisons, swaps, or array updates.

#### 4.2 Searching Algorithms

The searching page includes:

- Binary Search
- Linear Search

Linear Search checks each value one by one until the target value is found or the end of the array is reached. Binary Search uses a sorted array and repeatedly checks the middle value to reduce the search range.

It highlights:

- Current search range
- Current value or middle value
- Target value
- Found or not found status

Users can enter a target value, generate a random sorted array, start the search, pause or resume, reset, and change the speed.

#### 4.3 Pathfinding Algorithms

The pathfinding page includes:

- Breadth First Search
- A* Search

The pathfinding visualisation uses a grid.

It highlights:

- Start node
- Target node
- Obstacle cells
- Visited nodes
- Final path

Users can select the algorithm, start it, pause or resume, reset the grid, and change the speed. Obstacle cells are avoided by both Breadth First Search and A* Search during execution.

#### 4.4 Canvas Demonstration

The Canvas page demonstrates the use of the HTML Canvas API.

It includes:

- Play
- Pause
- Next Step
- Reset

This page shows a simple step-by-step Canvas-based visualisation.

### 5. Technologies Used

This project was developed using:

- React
- JavaScript
- HTML
- CSS
- Vite
- GitHub Pages

The main visual elements are created using DOM-based components. The Canvas page uses the HTML Canvas API.

### 6. Project Structure

The main project files are organised like this:

```text
src/
  App.jsx
  main.jsx

  pages/
    HomePage.jsx
    LoginPage.jsx
    SortingPage.jsx
    SearchingPage.jsx
    PathfindingPage.jsx
    CanvasPage.jsx

  algorithms/
    sorting/
      bubbleSort.js
      quickSort.js
      mergeSort.js
      selectionSort.js

  styles/
    App.css
```

### 7. How to Run the Project Locally

In order to run the project on your own computer, follow these steps.

#### 7.1 Clone the repository

```bash
git clone https://github.com/SofZe/algorithm-explorer.git
```

#### 7.2 Open the project folder

```bash
cd algorithm-explorer
```

#### 7.3 Install dependencies

```bash
npm install
```

#### 7.4 Start the development server

```bash
npm run dev
```

#### 7.5 Open the local link

After running the command, Vite will show a local link, usually similar to:

```text
http://localhost:5173/
```

Open this link in a browser to use the application locally.

### 8. How to Build the Project

To create a production build, run:

```bash
npm run build
```

The production files will be created in the dist folder.

### 9. Deployment

The project is deployed using GitHub Pages.

The Vite configuration includes a base path for the GitHub Pages repository:

```javascript
base: "/algorithm-explorer/"
```

A GitHub Actions workflow builds and deploys the project automatically when changes are pushed to the main branch.

### 10. Privacy and Ethical Notes

This application does not collect personal or sensitive data, does not use real user accounts or server-side storage, and only stores the display name locally in the browser for interface personalisation.

### 11. Author

ID: 100723789

Project: Web-Based Algorithm Visualization System


