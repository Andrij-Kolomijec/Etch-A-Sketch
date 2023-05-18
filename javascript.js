// Create the grid
const div = document.querySelector("#container");
function generateGrid(number) {
    for (let i = 0; i < number; i++) {
        let divI = document.createElement("div");
        for (let j = 0; j < number; j++) {
            let divJ = document.createElement("div");
            divJ.setAttribute("class", "inside")
            divI.appendChild(divJ);
        }
        div.appendChild(divI);
    }
}

generateGrid(16);

// Mouse hover event and change color
div.addEventListener("mouseover", e => e.target.style.background = "blue");

// Button to change the grid
let height = document.querySelector("div").style.height;
let width = document.querySelector("div").style.width;
let squares = 16;
const inside = document.querySelector(".inside");
const button = document.querySelector("button");
button.addEventListener("click", () => {
    squares = Number(prompt("Change the number of squares per side (up to 100):", 16));
    while (isNaN(squares) || squares > 100 || squares < 1) {
        squares = Number(prompt("Must be a number from 1 to 100!", 16));
    }
    clearDiv();
    height = div.style.height = `${480/squares}px`;
    width = div.style.width = height;
    generateGrid(squares);
});

function clearDiv() {
    document.querySelector("#container").innerHTML = "";
}