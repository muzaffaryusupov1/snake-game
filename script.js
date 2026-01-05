const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [
	{ x: 200, y: 200 }, // boshi
	{ x: 180, y: 200 }, // tanasi
	{ x: 160, y: 200 }, // dumi
];

document.addEventListener('keydown', changeDirection);
let dx = 20;
let dy = 0;
let foodX;
let foodY;

function changeDirection(event) {
	const keyPressed = event.keyCode;
	const LEFT_KEY = 37;
	const RIGHT_KEY = 39;
	const UP_KEY = 38;
	const DOWN_KEY = 40;

	if (keyPressed === UP_KEY) {
		dx = 0;
		dy = -20;
	}
	if (keyPressed === LEFT_KEY) {
		dx = -20;
		dy = 0;
	}
	if (keyPressed === DOWN_KEY) {
		dx = 0;
		dy = 20;
	}
	if (keyPressed === RIGHT_KEY) {
		dx = 20;
		dy = 0;
	}
}

function main() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = 'red';
	ctx.fillRect(foodX, foodY, 20, 20);

	advanceSnake();
	drawSnake();
}

function drawSnake() {
	snake.forEach(part => {
		ctx.fillStyle = 'green';
		ctx.fillRect(part.x, part.y, 20, 20);
	});
}

function advanceSnake() {
	const head = { x: snake[0].x + dx, y: snake[0].y + dy };

	const didEatFood = snake[0].x === foodX && snake[0].y === foodY;

	if (didEatFood) {
		snake.unshift(head);
		createFood();
	} else {
		snake.unshift(head);
		snake.pop();
	}
}

function createFood() {
	foodX = Math.floor(Math.random() * 20) * 20;
	foodY = Math.floor(Math.random() * 20) * 20;
}

createFood();
// setInterval(main, 100);
