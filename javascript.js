// Create the grid
const div = document.querySelector("#container");
for (let i = 0; i < 16; i++) {
    let divI = document.createElement("div");
    for (let j = 0; j < 16; j++) {
        let divJ = document.createElement("div");
        divJ.setAttribute("class", "inside")
        divI.appendChild(divJ);
    }
    div.appendChild(divI);
}

// Mouse hover event and change color
div.addEventListener("mouseover", e => changeColor(e.target));

function changeColor(tar) {
    tar.style.background = "blue";
}

// Button to change the grid
let squares = 16;
const button = document.querySelector("button");
button.addEventListener("click", () => {
    squares = Number(prompt("Change the number of squares per side (up to 100):", 16));
    while (isNaN(squares) || squares > 100 || squares < 1) {
        squares = Number(prompt("Must be a number from 1 to 100!", 16));
    }
    div.style.height
});

