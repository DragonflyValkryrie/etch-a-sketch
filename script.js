let gridSize = 20;

var slider = document.getElementById("myRange");
const container = document.querySelector(".container");
const grid = document.getElementById("grid");
const gridSizeValue = document.getElementById("value");

slider.oninput = function() {
    var value = (this.value - this.min) / (this.max - this.min) * 85;
    var colorStops = [
        "skyblue",
        "deepskyblue",
        "dodgerblue",
        "blue",
        "white"
    ];
    var gradientColors = colorStops.map((color, index) => {
        var stop = (value / 100) * (this.max - 1);
        return `${color} ${stop * index}%`;
    });
    this.style.background = `linear-gradient(to right, ${gradientColors.join(', ')})`;
    
    gridSize = parseInt(this.value);
    changeGridSize(gridSize);
};


function createGrid(size) {

    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");
        square.classList.add("square");

        square.addEventListener("mouseenter", function () {
            square.style.background = defaultColor();
        });

        container.appendChild(square);
    }
};

createGrid(gridSize);