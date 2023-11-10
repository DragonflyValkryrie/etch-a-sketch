let gridSize = 0;
let selectedColor = "default";

var slider = document.getElementById("myRange");
const container = document.querySelector(".container");
const grid = document.getElementById("grid");
const gridSizeValue = document.getElementById("value");

const rainbowButton = document.querySelector(".rainbow-color");
const deafultButton = document.querySelector(".deafult-color");
const clearButton = document.querySelector(".clear-button");

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

function setCurrentSize(newSize) {
    currentSize = newSize;
  };

function changeGridSize(size) {
    setCurrentSize(size);
    updateGridSizeValue(size);
    reloadGrid();
};

function clearGrid() {
    grid.innerHTML = '';
};

function updateGridSizeValue(size) {
    gridSizeValue.innerHTML = `${size} x ${size}`;
};

function reloadGrid() {
    clearGrid();
    createGrid(currentSize);
};

function createGrid(size) {

    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;


    for (let i = 0; i < size * size; i++) {
        const square = document.createElement("div");
        square.classList.add("square");

        square.addEventListener("mouseenter", function () {
            square.style.background = colorPicked();
        });

        container.appendChild(square);
    }
};

createGrid(gridSize);

rainbowButton.addEventListener("click", () => {
    selectedColor = "rainbow";
});

deafultButton.addEventListener("click", () => {
    selectedColor = "default";
});

clearButton.addEventListener("click", () => {
    reloadGrid();
});

function colorPicked() {
    if (selectedColor === 'rainbow') {
        return rainbowColor();
    } else {
        return defaultColor();
    }
};

function rainbowColor() {
    const letters ="0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

function defaultColor(){
    color = "grey";
    return color;
};