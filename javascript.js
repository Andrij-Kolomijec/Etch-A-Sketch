const div = document.querySelector("#container");
for (let i = 0; i < 16; i++) {
    let divI = document.createElement("div");
    for (let j = 0; j < 16; j++) {
        let divJ = document.createElement("div");
        divJ.setAttribute("id", "inside")
        divI.appendChild(divJ);
    }
    div.appendChild(divI);
}