function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }

  return arr;
}


let grid;
let COLS = 100;
let ROWS = 100;

function setup() {
  grid = make2DArray(COLS, ROWS);

  // fill in the grid with random values (1 || 2)
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      grid[i][j] = floor(random(2));
    }
  }

  console.table(grid);

  createCanvas(750, 750);
  frameRate(20);
}

function draw() {
  background(0);



  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      let cellWidth = width / COLS;
      let cellHeight = height / ROWS;

      let x = i * cellWidth;
      let y = j * cellHeight;

      if (grid[i][j] == 1) {
        fill(255);
        rect(x, y, cellWidth, cellHeight);
      }
    }
  }

  // Initialize a new array for the next frame
  let nextGen = make2DArray(COLS, ROWS);

  // Compute the next grid
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {

      // // Edge cases
      // if (i == 0 || i == COLS - 1 || j == 0 || j == ROWS - 1) {
      //   nextGen[i][j] = grid[i][j] // TODO: REMOVE PLACEHOLDER
      // }
      // else {
      // Count the neighbors
      let sum = 0;
      let neighbors = countNeighbors(grid, i, j);
      let curState = grid[i][j];

      // Apply the rules
      if (curState == 0 && neighbors == 3) {
        nextGen[i][j] = 1;
      }
      else if (curState == 1 && (neighbors < 2 || neighbors > 3)) {
        nextGen[i][j] = 0;
      }
      else {
        nextGen[i][j] = grid[i][j];
      }
      // }
    }
  }

  grid = nextGen;

}

function countNeighbors(grid, x, y) {
  let sum = 0;

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {

      // Toroidal grid implementation
      gridX = (x + i + COLS) % COLS;
      gridY = (y + j + ROWS) % ROWS;

      sum += grid[gridX][gridY];
    }
  }

  return sum - grid[x][y];
}
