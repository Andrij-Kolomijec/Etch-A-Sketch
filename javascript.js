// Create the grid
const container = document.querySelector("#container");
let squares = 16;
let isRainbowActive = false;
let isGreyScaleActive = false;
let isMouseDown = false;

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
    let boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => box.numPasses = 0);
    if (isGreyScaleActive) greyScaleMode();
    if (isRainbowActive) rainbowMode();
}

generateGrid(squares);

//Change the grid size with slider
const slider = document.querySelector(".slider");
const label = document.querySelector("label");
slider.addEventListener("mousemove", () => {
    if (isMouseDown) {
        squares = slider.value;
        label.textContent = `${squares}x${squares} squares`;
        container.innerHTML = "";
        generateGrid(squares);
    }
})
slider.addEventListener("click", () => {
    squares = slider.value;
    label.textContent = `${squares}x${squares} squares`;
    container.innerHTML = "";
    generateGrid(squares);
})

// Mouse down + hover, mouse up events
document.addEventListener("mousedown", () => isMouseDown = true);
document.addEventListener("mouseup", () => isMouseDown = false);

let color = "black"; //initial color
container.addEventListener("mouseover", (e) => {
    if (isMouseDown) {
        e.target.style.background = color; //drawing is activated by pressing and holding the mouse
    }
})
container.addEventListener("mousedown", (e) => e.target.style.background = color); //ensures the square which was clicked first is also colored

function resetNumPasses(event) {
    const box = event.target;
    if (isMouseDown) box.numPasses = 0;
}

//Change color with palette
const inputColor = document.querySelector("#inputColor");
inputColor.addEventListener("mouseleave", () => {
    color = inputColor.value;
    let boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
        box.removeEventListener("mouseover", makeGreyScale);
        box.removeEventListener("mouseover", makeRainbow);
        box.addEventListener("mouseover",resetNumPasses)
    })
    isRainbowActive = false;
    isGreyScaleActive = false;
    eraser.classList.remove("btn-on");
    rainbowColor.classList.remove("btn-on");
    greyScale.classList.remove("btn-on");
})

//Rainbow mode
const rainbowColor = document.querySelector("#rainbow");
function rainbowMode() {
    let boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
        box.removeEventListener("mouseover", makeGreyScale);
        box.removeEventListener("mouseover", resetNumPasses);
        box.addEventListener("mouseover",makeRainbow);
    })
    isGreyScaleActive = false;
    isRainbowActive = true;
    eraser.classList.remove("btn-on");
    greyScale.classList.remove("btn-on");
    rainbowColor.classList.add("btn-on");
}
function makeRainbow(event) {
    const box = event.target;
    color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    if (isMouseDown) box.numPasses = 0;
}
rainbowColor.addEventListener("click", rainbowMode);

//Grey scale mode
const greyScale = document.querySelector("#greyScale");
function greyScaleMode() {
    let boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
        box.removeEventListener("mouseover", makeGreyScale);
        box.removeEventListener("mouseover", makeRainbow);
        box.removeEventListener("mouseover", resetNumPasses);
        box.addEventListener("mouseover", makeGreyScale);
    })
    isGreyScaleActive = true;
    isRainbowActive = false;
    eraser.classList.remove("btn-on");
    rainbowColor.classList.remove("btn-on");
    greyScale.classList.add("btn-on");
}
function makeGreyScale(event) {
    const box = event.target;
    color = `rgba(0, 0, 0, ${(10 * (box.numPasses + 1)) / 100})`;
    if (isMouseDown) box.numPasses++;
    // console.log(box.numPasses);
}
greyScale.addEventListener("click", greyScaleMode);

//Eraser
const eraser = document.querySelector("#eraser");
eraser.addEventListener("click", () => {
    color = "white";
    let boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
        box.removeEventListener("mouseover", makeGreyScale);
        box.removeEventListener("mouseover", makeRainbow);
        box.addEventListener("mouseover",resetNumPasses)
    })
    isGreyScaleActive = false;
    isRainbowActive = false;
    rainbowColor.classList.remove("btn-on");
    greyScale.classList.remove("btn-on");
    eraser.classList.add("btn-on");
})
