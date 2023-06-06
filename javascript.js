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
        if (isRainbowActive) rainbowMode();
        if (isGreyScaleActive) greyScaleMode();
    };
};

generateGrid(squares);


//Change the grid size with slider
let isSliderActive = false;
const slider = document.querySelector(".slider");
const label = document.querySelector("label");
slider.addEventListener("mousedown", () => isSliderActive = true);
slider.addEventListener("mousemove", () => {
    if (isSliderActive) {
        squares = slider.value;
        container.innerHTML = "";
        generateGrid(squares);
        label.textContent = `${squares}x${squares} squares`;
        isSliderActive = false;
        // const box = document.querySelectorAll(".box");
    }
});


// Mouse down + hover, mouse up events
document.addEventListener("mousedown", () => isMouseDown = true);
document.addEventListener("mouseup", () => isMouseDown = false);

let color = "black"; //initial color
container.addEventListener("mouseover", (e) => {
    if (isMouseDown) e.target.style.background = color
});
container.addEventListener("mousedown", (e) => e.target.style.background = color); //ensures the square which was clicked first is also colored

//Change color with palette
const inputColor = document.querySelector("#inputColor");
inputColor.addEventListener("mouseleave", () => {
    let boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
        box.addEventListener("mouseover",() => color = inputColor.value)
    });
    isRainbowActive = false;
    isGreyScaleActive = false;
    eraser.classList.remove("btn-on");
    rainbowColor.classList.remove("btn-on");
    greyScale.classList.remove("btn-on");
});

//Rainbow mode
const rainbowColor = document.querySelector("#rainbow");
function rainbowMode() {
    let boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
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
        box.addEventListener("mouseover",() => {
        if (box.classList.contains("grey10")) {
            color = "rgb(0,0,0)";
        } else if (box.classList.contains("grey9")) {
            box.classList.remove("grey9");
            box.classList.add("grey10");
            color = "rgb(0,0,0)";
        } else if (box.classList.contains("grey8")) {
            box.classList.remove("grey8");
            box.classList.add("grey9");  
            color = "rgb(20,20,20)";
        } else if (box.classList.contains("grey7")) {
            box.classList.remove("grey7");
            box.classList.add("grey8");
            color = "rgb(40,40,40)";
        } else if (box.classList.contains("grey6")) {
            box.classList.remove("grey6");
            box.classList.add("grey7");
            color = "rgb(60,60,60)";
        } else if (box.classList.contains("grey5")) {
            box.classList.remove("grey5");
            box.classList.add("grey6");
            color = "rgb(80,80,80)";
        } else if (box.classList.contains("grey4")) {
            box.classList.remove("grey4");
            box.classList.add("grey5");
            color = "rgb(110,110,110)";
        } else if (box.classList.contains("grey3")) {
            box.classList.remove("grey3");
            box.classList.add("grey4"); 
            color = "rgb(140,140,140)";
        } else if (box.classList.contains("grey2")) {
            box.classList.remove("grey2");
            box.classList.add("grey3");
            color = "rgb(170,170,170)";
        } else if (box.classList.contains("grey1")) {
            box.classList.remove("grey1");
            box.classList.add("grey2");
            color = "rgb(200,200,200)";
        } else {
            box.classList.add("grey1");
            color = "rgb(230,230,230)";
            }
        })
    });
    isGreyScaleActive = true;
    isRainbowActive = false;
    eraser.classList.remove("btn-on");
    rainbowColor.classList.remove("btn-on");
    greyScale.classList.add("btn-on");
}
greyScale.addEventListener("click", greyScaleMode);

//Eraser
const eraser = document.querySelector("#eraser");
eraser.addEventListener("click", () => {
    let boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
        box.addEventListener("mouseover",() => color = "white");
    });
    isGreyScaleActive = false;
    isRainbowActive = false;
    rainbowColor.classList.remove("btn-on");
    greyScale.classList.remove("btn-on");
    eraser.classList.add("btn-on")
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