
document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('gameArea');
    let snake = [{ x: 200, y: 200 }];
    let food = { x: getRandomCoordinate(), y: getRandomCoordinate() };
    let direction = { x: 0, y: 0 };
    let lastRenderTime = 0;
    let growthCounter = 0;
    const SNAKE_SPEED = 5; // moves per second
    const GAME_SIZE = 400;
    const SEGMENT_SIZE = 10;

    function main(currentTime) {
        if (growthCounter >= 1000) return; // Stop the game after 1000px growth

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
        
        // Check for food consumption
        if (head.x === food.x && head.y === food.y) {
            growthCounter += SEGMENT_SIZE;
            food = { x: getRandomCoordinate(), y: getRandomCoordinate() };
        } else {
            snake.pop();
        }
    }

    function drawGame() {
        gameArea.innerHTML = '';
        snake.forEach((segment, index) => {
            const snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = segment.y;
            snakeElement.style.gridColumnStart = segment.x;
            snakeElement.classList.add('snake');
            if (index === 0) snakeElement.classList.add('snake-head');
            gameArea.appendChild(snakeElement);
        });

        const foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        gameArea.appendChild(foodElement);
    }

    function getRandomCoordinate() {
        return Math.floor(Math.random() * (GAME_SIZE / SEGMENT_SIZE)) * SEGMENT_SIZE;
    }

    window.requestAnimationFrame(main);

    window.addEventListener('keydown', e => {
        switch (e.key) {
            case 'ArrowUp': direction = { x: 0, y: -SEGMENT_SIZE }; break;
            case 'ArrowDown': direction = { x: 0, y: SEGMENT_SIZE }; break;
            case 'ArrowLeft': direction = { x: -SEGMENT_SIZE, y: 0 }; break;
            case 'ArrowRight': direction = { x: SEGMENT_SIZE, y: 0 }; break;
        }
    });
});

