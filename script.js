const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Adjust canvas size
canvas.width = 1000;
canvas.height = 800;

// Center the canvas horizontally on the page
canvas.style.display = 'block';
canvas.style.margin = '0 auto';

const ballRadius = 15;
let x = Math.random() * (canvas.width - ballRadius * 2) + ballRadius; // Random x-coordinate
let y = canvas.height - 50; // Fixed y-coordinate
let dx = 2; // Initial speed along x-axis
let dy = -2; // Initial speed along y-axis

const paddleHeight = 15;
let paddleWidth = 120; // Increase paddle width
let paddleX = (canvas.width - paddleWidth) / 2;

let score = 0;
let lives = 3; // Number of lives

document.addEventListener('mousemove', mouseMoveHandler);

function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText('Score: ' + score, 8, 20);
}

function drawLives() {
    ctx.font = '16px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText('Lives: ' + lives, canvas.width - 65, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            score++; // Increase score when ball hits paddle

            // Speed up the ball based on score (every 5 points)
            if (score % 5 === 0) {
                dx = (dx > 0 ? dx + .75 : dx - .75);
                dy = (dy > 0 ? dy + .75 : dy - .75);
            }
        } else {
            lives--; // Decrease lives when ball hits the bottom
            if (!lives) {
                alert('Game Over');
                document.location.reload();
            } else {
                x = Math.random() * (canvas.width - ballRadius * 2) + ballRadius; // Random x-coordinate
                y = canvas.height - 50; // Fixed y-coordinate
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();
