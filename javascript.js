// Create the grid
const container = document.querySelector("#container");
let squares = 16;
let isRainbowActive = false;

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
        if (isRainbowActive) rainbowMode();
    }
}

generateGrid(squares);

//Change the grid size with slider
let isSliderActive = false;
const slider = document.querySelector(".slider");
const label = document.querySelector("label");
slider.addEventListener("mousedown", () => isSliderActive = true);
slider.addEventListener("mousemove", () => {
    if (isSliderActive) {
        let newSquares = slider.value;
        squares = newSquares;
        clearGrid();
        generateGrid(squares);
        label.textContent = `${squares}x${squares} squares`;
        isSliderActive = false;
        // const box = document.querySelectorAll(".box");
    }
});

// Mouse hover event and change color
let color = "black";
container.addEventListener("mouseover", e => e.target.style.background = color);

const inputColor = document.querySelector("#inputColor");
inputColor.addEventListener("mouseleave", () => {
    let boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
        box.addEventListener("mouseover",() => color = inputColor.value)
    });
    isRainbowActive = false;
});

const rainbowColor = document.querySelector("#rainbow");
function rainbowMode() {
    let boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
        box.addEventListener("mouseover",() => color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`)
    });
    isRainbowActive = true;
}
rainbowColor.addEventListener("click", rainbowMode);

const eraser = document.querySelector("#eraser");
eraser.addEventListener("click", () => {
    let boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
        box.addEventListener("mouseover",() => color = "white");
    });
    isRainbowActive = false;
});

function clearGrid() {
    container.innerHTML = "";
}

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