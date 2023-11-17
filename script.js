document.addEventListener('DOMContentLoaded', () => {
    const GAME_SIZE = 400;
    const SNAKE_SPEED = 5;
    const SEGMENT_SIZE = 10;
    let score = 0;

    const gameArea = document.getElementById('gameArea');
    const scoreDisplay = document.getElementById('score');
    const restartButton = document.getElementById('restartButton');
    let snake = [{ x: 200, y: 200 }];
    let food = { x: getRandomCoordinate(), y: getRandomCoordinate() };
    let direction = { x: SEGMENT_SIZE, y: 0 };
    let lastRenderTime = 0;
    let gameRunning = false;

    function main(currentTime) {
        if (!gameRunning) return;

        window.requestAnimationFrame(main);
        const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
        if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
        lastRenderTime = currentTime;

        updateGame();
        drawGame();
    }

    function updateGame() {
        // Update snake position
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
        snake.unshift(head);

        // Check for wall collision
        if (head.x < 0 || head.x >= GAME_SIZE || head.y < 0 || head.y >= GAME_SIZE) {
            endGame();
            return;
        }

        // Check for self collision
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                endGame();
                return;
            }
        }

        // Check for food consumption
        if (head.x === food.x && head.y === food.y) {
            score += 1;
            scoreDisplay.textContent = 'Score: ' + score;
            food = { x: getRandomCoordinate(), y: getRandomCoordinate() };
        } else {
            snake.pop();
        }
    }

    function drawGame() {
        gameArea.innerHTML = '';
        snake.forEach(segment => {
            const snakeElement = document.createElement('div');
            snakeElement.style.left = segment.x + 'px';
            snakeElement.style.top = segment.y + 'px';
            snakeElement.classList.add('snake');
            gameArea.appendChild(snakeElement);
        });

        const foodElement = document.createElement('div');
        foodElement.style.left = food.x + 'px';
        foodElement.style.top = food.y + 'px';
        foodElement.classList.add('food');
        gameArea.appendChild(foodElement);
    }

    function getRandomCoordinate() {
        return Math.floor(Math.random() * (GAME_SIZE / SEGMENT_SIZE)) * SEGMENT_SIZE;
    }

    function endGame() {
        gameRunning = false;
        restartButton.style.display = 'block';
    }

    function restartGame() {
        snake = [{ x: 200, y: 200 }];
        direction = { x: SEGMENT_SIZE, y: 0 };
        food = { x: getRandomCoordinate(), y: getRandomCoordinate() };
        lastRenderTime = 0;
        score = 0;
        scoreDisplay.textContent = 'Score: ' + score;
        gameRunning = true;
        restartButton.style.display = 'none';
        window.requestAnimationFrame(main);
    }

    restartButton.addEventListener('click', restartGame);

    window.addEventListener('keydown', e => {
        switch (e.key) {
            case 'ArrowUp': if (direction.y === 0) direction = { x: 0, y: -SEGMENT_SIZE }; break;
            case 'ArrowDown': if (direction.y === 0) direction = { x: 0, y: SEGMENT_SIZE }; break;
            case 'ArrowLeft': if (direction.x === 0) direction = { x: -SEGMENT_SIZE, y: 0 }; break;
            case 'ArrowRight': if (direction.x === 0) direction = { x: SEGMENT_SIZE, y: 0 }; break;
        }
    });

    restartGame(); // Start the game initially
});

