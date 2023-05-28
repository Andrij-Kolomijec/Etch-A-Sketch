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

//Change the grid size with slider
const slider = document.querySelector(".slider");
const label = document.querySelector("label");
slider.addEventListener("mousemove", () =>{
    let newSquares = slider.value;
    squares = newSquares;
    clearGrid();
    generateGrid(squares);
    label.textContent = `${squares}x${squares} squares`;
})

// Mouse hover event and change color
let color = "black";
container.addEventListener("mouseover", e => e.target.style.background = color);

const inputColor = document.querySelector("#inputColor");
inputColor.addEventListener("mouseleave", () => color = inputColor.value)

function clearGrid() {
    container.innerHTML = "";
}

// Erase button
const erase = document.querySelector("#erase");
erase.addEventListener("click", () => {
    clearGrid();
    generateGrid(squares);
    });

// Choose color button
const choose = document.querySelector("#choose");
choose.type = "color";
choose.addEventListener("click", () => {
    
    });

// Rainbow button
const rainbow = document.querySelector("#rainbow");
rainbow.addEventListener("click", () => {
    
    });


    // NO LONGER NEEDED //

// Button to change the grid
// const change = document.querySelector("#change");
// change.addEventListener("click", () => {
//     let newSquares = Number(prompt("Change the number of squares per side (up to 100):", 16));
//     while (isNaN(newSquares) || newSquares > 100 || newSquares < 1) {
//         newSquares = Number(prompt("Must be a number from 1 to 100!", 16));
//     }
//     squares = newSquares;
//     clearGrid();
//     generateGrid(squares);
// });