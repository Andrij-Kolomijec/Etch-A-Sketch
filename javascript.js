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
        };
        container.appendChild(row);
    if (isGreyScaleActive) greyScaleMode();
    if (isRainbowActive) rainbowMode();
    }
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
    }        
)

// Mouse down + hover, mouse up events
document.addEventListener("mousedown", () => isMouseDown = true);
document.addEventListener("mouseup", () => isMouseDown = false);

let color = "black"; //initial color
function mouseEvents () {
    container.addEventListener("mouseover", (e) => {
        if (isMouseDown) e.target.style.background = color //to color one needs to press and hold the mouse
        })
    container.addEventListener("mousedown", (e) => e.target.style.background = color); //ensures the square which was clicked first is also colored
}

mouseEvents();

//Change color with palette
const inputColor = document.querySelector("#inputColor");
inputColor.addEventListener("click", () => {
    let boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
        box.removeEventListener("mouseover", boxHover);
        box.addEventListener("mouseover",() => color = inputColor.value)
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
        box.removeEventListener("mouseover", boxHover);
        box.addEventListener("mouseover",() => color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`)
    });
    isGreyScaleActive = false;
    isRainbowActive = true;
    eraser.classList.remove("btn-on");
    greyScale.classList.remove("btn-on");
    rainbowColor.classList.add("btn-on");
}
rainbowColor.addEventListener("click", rainbowMode);

//Grey scale mode
const greyScale = document.querySelector("#greyScale");
function greyScaleMode() {
    let boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
        box.removeEventListener("mouseover", boxHover);
        box.numPasses = 1;
        box.addEventListener("mouseover", boxHover)
    })
    isGreyScaleActive = true;
    isRainbowActive = false;
    eraser.classList.remove("btn-on");
    rainbowColor.classList.remove("btn-on");
    greyScale.classList.add("btn-on");
}
function boxHover(event) {
    if (isMouseDown) {
        const box = event.target;
        color= `rgba(0, 0, 0, ${(10 * box.numPasses) / 100})`;
        box.numPasses++;
    }
}
greyScale.addEventListener("click", greyScaleMode);

//Eraser
const eraser = document.querySelector("#eraser");
eraser.addEventListener("click", () => {
    let boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => box.addEventListener("mouseover",() => color = "white"));
    isGreyScaleActive = false;
    isRainbowActive = false;
    rainbowColor.classList.remove("btn-on");
    greyScale.classList.remove("btn-on");
    eraser.classList.add("btn-on");
})
