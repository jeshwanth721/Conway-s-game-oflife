// Define the grid size and initial state
const gridSize = 20;
let grid = createGrid(gridSize);
let isRunning = false;
let generationCount = 0;
let intervalId;

// Create a 2D grid with all cells initially dead
function createGrid(size) {
  const grid = [];
  for (let i = 0; i < size; i++) {
    grid[i] = [];
    for (let j = 0; j < size; j++) {
      grid[i][j] = false;
    }
  }
  return grid;
}

// Render the grid on the HTML table
function renderGrid() {
  const gridElement = document.getElementById("grid");
  gridElement.innerHTML = "";

  for (let i = 0; i < gridSize; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < gridSize; j++) {
      const cell = document.createElement("td");
      cell.addEventListener("click", () => toggleCellState(i, j));
      if (grid[i][j]) {
        cell.className = "live";
      }
      row.appendChild(cell);
    }
    gridElement.appendChild(row);
  }
}

// Toggle the state of a cell between alive and dead
function toggleCellState(row, col) {
  grid[row][col] = !grid[row][col];
  renderGrid();
}

// Update the grid to the next generation
function nextGeneration() {
  const newGrid = createGrid(gridSize);

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const neighbors = countNeighbors(i, j);

      // Apply the rules of Conway's Game of Life
      if (grid[i][j] && (neighbors === 2 || neighbors === 3)) {
        newGrid[i][j] = true; // Cell survives
      } else if (!grid[i][j] && neighbors === 3) {
        newGrid[i][j] = true; // Cell is born
      }
    }
  }

  grid = newGrid;
  generationCount++;
  document.getElementById("generationCounter").textContent = `Generations: ${generationCount}`;
  renderGrid();
}

// Count the number of live neighbors for a given cell
function countNeighbors(row, col) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue; // Skip the current cell
      const neighborRow = row + i;
      const neighborCol = col + j;
      if (
        neighborRow >= 0 &&
        neighborRow < gridSize &&
        neighborCol >= 0 &&
        neighborCol < gridSize
      ) {
        count += grid[neighborRow][neighborCol] ? 1 : 0;
      }
    }
  }
  return count;
}

// Start the game
function startGame() {
  if (!isRunning) {
    intervalId = setInterval(nextGeneration, 500);
    isRunning = true;
  }
}

// Stop the game
// Stop the game and reset the generation count to zero
function stopGame() {
    if (isRunning) {
      clearInterval(intervalId);
      isRunning = false;
      generationCount = 0;
      document.getElementById("generationCounter").textContent = `Generations: ${generationCount}`;
    }
  }

// Initialize the grid
renderGrid();

// Add event listeners to buttons
document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("stopButton").addEventListener("click", stopGame);
