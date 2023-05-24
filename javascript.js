// Create the grid
const container = document.querySelector("#container");
let squares = 16;

function generateGrid(number) {
    let boxSize = `${480 / squares}px`;
    for (let i = 0; i < number; i++) {
        let row = document.createElement("div");
        row.setAttribute("class", "row");
        for (let j = 0; j < number; j++) {
            let box = document.createElement("div");
            box.setAttribute("class", "box");
            box.style.width = boxSize;
            box.style.height = boxSize;
            row.appendChild(box);
        }
        container.appendChild(row);
    }
}

generateGrid(squares);

// Mouse hover event and change color
container.addEventListener("mouseover", e => e.target.style.background = "blue");

// Button to change the grid
const button = document.querySelector("button");
button.addEventListener("click", () => {
    let newSquares = Number(prompt("Change the number of squares per side (up to 100):", 16));
    while (isNaN(newSquares) || newSquares > 100 || newSquares < 1) {
        newSquares = Number(prompt("Must be a number from 1 to 100!", 16));
    }
    squares = newSquares;
    clearGrid();
    generateGrid(squares);
});

function clearGrid() {
    container.innerHTML = "";
}
