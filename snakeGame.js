
document.addEventListener('keydown', function(event) {
    if (event.code === 'Enter') {
        startGame();
    }
});

let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let snake = [{ x: 150, y: 200 }];
let food = { x: 300, y: 200 };
let dx = 10;
let dy = 0;
let totalEaten = 0;

function startGame() {
    document.addEventListener('keydown', changeDirection);
    setInterval(updateGame, 100);
}

function updateGame() {
    if (isGameOver()) return;

    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    checkFoodCollision();
}

function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = 'green';
    for (let part of snake) {
        ctx.fillRect(part.x, part.y, 10, 10);
    }
}

function moveSnake() {
    let head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (totalEaten * 10 < 1000) {
        snake.pop();
    }
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
}

function changeDirection(event) {
    if (event.code === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -10;
    } else if (event.code === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = 10;
    } else if (event.code === 'ArrowLeft' && dx === 0) {
        dx = -10;
        dy = 0;
    } else if (event.code === 'ArrowRight' && dx === 0) {
        dx = 10;
        dy = 0;
    }
}

function checkFoodCollision() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        totalEaten++;
        food = { x: Math.floor(Math.random() * (canvas.width / 10)) * 10, 
                 y: Math.floor(Math.random() * (canvas.height / 10)) * 10 };
    }
}

function isGameOver() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    return snake[0].x < 0 || snake[0].x >= canvas.width ||
           snake[0].y < 0 || snake[0].y >= canvas.height;
}
