const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

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
let score = 0;
let gameSpeed = 100;

function changeDirection(event) {
	const keyPressed = event.keyCode;
	const LEFT_KEY = 37;
	const RIGHT_KEY = 39;
	const UP_KEY = 38;
	const DOWN_KEY = 40;

	if (keyPressed === UP_KEY && dy !== 20) {
		dx = 0;
		dy = -20;
	}
	if (keyPressed === LEFT_KEY && dx !== 20) {
		dx = -20;
		dy = 0;
	}
	if (keyPressed === DOWN_KEY && dy !== -20) {
		dx = 0;
		dy = 20;
	}
	if (keyPressed === RIGHT_KEY && dx !== -20) {
		dx = 20;
		dy = 0;
	}
}

function main() {
	if (didGameEnd() === true) {
		alert('Game over :( Restart the page to start a new game');
		return;
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = 'red';
	ctx.fillRect(foodX, foodY, 20, 20);

	ctx.beginPath();
	for (let x = 0; x <= 400; x += 20) {
		ctx.moveTo(x, 0);
		ctx.lineTo(x, 400);

		ctx.moveTo(0, x);
		ctx.lineTo(400, x);
	}
	ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'; // Juda och oq rang
	ctx.stroke();

	advanceSnake();
	drawSnake();
	setTimeout(main, gameSpeed);
}

function drawSnake() {
	snake.forEach(part => {
		ctx.fillStyle = 'green';
		ctx.fillRect(part.x, part.y, 20, 20);
	});
}

function advanceSnake() {
	const head = { x: snake[0].x + dx, y: snake[0].y + dy };

	const didEatFood = head.x === foodX && head.y === foodY;

	if (didEatFood) {
		score++;
		scoreElement.innerHTML = score;
		snake.unshift(head);
		createFood();
	} else {
		snake.unshift(head);
		snake.pop();
	}

	if (score === 5) {
		gameSpeed = 50;
	}
}

function createFood() {
	foodX = Math.floor(Math.random() * 20) * 20;
	foodY = Math.floor(Math.random() * 20) * 20;
}

function didGameEnd() {
	const head = snake[0];

	const hitLeftWall = head.x < 0;
	const hitRightWall = head.x >= canvas.width;
	const hitTopWall = head.y < 0;
	const hitBottomWall = head.y >= canvas.height;

	const hitSelf = snake.slice(1).some(part => part.x === head.x && part.y === head.y);
	return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall || hitSelf;
}

createFood();
main();
