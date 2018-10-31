// HOW TO WRITE THE CODE THIS GAME
// 1. we write some hard code and pick our own colors for check if our logic works (testing purposes)
// 2. we randomise the colors of our code
// 3. we code to make the game work without caring about DRY
// 4. we re-factor our code if it's necessary (usually it is...)

var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	setupModeButtons();
	setupSquares();
	reset();
 }

function setupModeButtons() {
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "easy" ? numSquares = 3 : numSquares = 6;  // ternary operator, to be used to avoid writing 5 lines of code
			reset();
		});
	}
}

function setupSquares() {
	for(var i = 0; i < squares.length; i++) {
	// add click listeners to squares
	squares[i].addEventListener("click", function(){
		// grab color of clicked square
		var clickedColor = this.style.backgroundColor;
		// compare color to pickedColor
		// console.log(clickedColor, pickedColor); // hacemos esto para hacer debugging y ver nuestro clicked color en contraste con el color que tenemos que acertar 
		// we define what happens if you win
		if(clickedColor === pickedColor) {
			messageDisplay.textContent = "Correct!";
			resetButton.textContent = "Play again?";
			changeColors(clickedColor);
			h1.style.backgroundColor = clickedColor;
		} else {
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent = "Try again";
		}
	});
	}
}

function reset() {
	// generate new colors
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	// change color display to match picked color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New colors";
	messageDisplay.textContent = "";
	// change colors of squares
	for(var i = 0; i < squares.length; i++) {
		if(colors[i]) { //if there is a color to paint, then do this:
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function(){
	reset();
});

function changeColors(color) {
	// loop through all squares
	for(var i = 0; i < squares.length; i++){
	// change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	//pick a random number
	var random = Math.floor(Math.random() * colors.length);
	// use that number to access and RETURN the RGB color of the randomly selected square
	return colors[random]; 
}

function generateRandomColors(num) {
	// make an array
	var arr = [];
	// repeat something num number of times, so 6 or 3
	for(var i = 0; i < num; i++) {
		// get random color an push into arr
		arr.push(randomColor());
	}
	// return that array
	return arr;
}

function randomColor() {
	// pick a "red" from 0 to 255
	var r = Math.floor(Math.random() * 256);
	// pick a "green" from 0 to 255
	var g = Math.floor(Math.random() * 256);
	// pick a "blue" from 0 to 255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")"; 
}