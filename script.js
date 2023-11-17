document.addEventListener('DOMContentLoaded', () => {
    const GAME_SIZE = 400;
    const SNAKE_SPEED = 5; // moves per second
    const SEGMENT_SIZE = 10;
    
    const gameArea = document.getElementById('gameArea');
    let snake = [{ x: 200, y: 200 }];
    let food = { x: getRandomCoordinate(), y: getRandomCoordinate() };
    let direction = { x: 0, y: 0 };
    let lastRenderTime = 0;
    let gameStarted = false;

    function main(currentTime) {
        if (!gameStarted) return;

        window.requestAnimationFrame(main);
        const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
        if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
        lastRenderTime = currentTime;

        updateGame();
        drawGame();
    }

    function updateGame() {
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
        snake.unshift(head);
        snake.pop(); // Remove the last segment

        // Check for food consumption
        if (head.x === food.x && head.y === food.y) {
            snake.push({}); // Add a new segment
            food = { x: getRandomCoordinate(), y: getRandomCoordinate() };
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

    window.addEventListener('keydown', e => {
        switch (e.key) {
            case 'Enter':
                if (!gameStarted) {
                    gameStarted = true;
                    window.requestAnimationFrame(main);
                }
                break;
            case 'ArrowUp': direction = { x: 0, y: -SEGMENT_SIZE }; break;
            case 'ArrowDown': direction = { x: 0, y: SEGMENT_SIZE }; break;
            case 'ArrowLeft': direction = { x: -SEGMENT_SIZE, y: 0 }; break;
            case 'ArrowRight': direction = { x: SEGMENT_SIZE, y: 0 }; break;
        }
    });
});


