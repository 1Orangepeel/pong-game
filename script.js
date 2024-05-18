const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Adjust canvas size
canvas.width = 1000;
canvas.height = 800;

// Center the canvas horizontally on the page
canvas.style.display = 'block';
canvas.style.margin = '0 auto';

const initialBallSpeed = 2; // Initial speed of the ball
const ballRadius = 15;
let balls = []; // Array to store multiple balls
balls.push(createBall(canvas.width / 2, canvas.height - 50, initialBallSpeed, -initialBallSpeed)); // Initial ball

const paddleHeight = 15;
const paddleWidth = 100;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

let score = 0;

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

function createBall(x, y, dx, dy) {
    return { x, y, dx, dy };
}

function drawBall(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
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

function updateBallSpeed(ball) {
    // Speed up the ball based on score
    if (score % 5 === 0 && score !== 0) { // Speed up every 5 points
        ball.dx = (ball.dx > 0 ? ball.dx + 1 : ball.dx - 1);
        ball.dy = (ball.dy > 0 ? ball.dy + 1 : ball.dy - 1);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawScore();

    balls.forEach(ball => {
        drawBall(ball);
        updateBallSpeed(ball);

        if (ball.x + ball.dx > canvas.width - ballRadius || ball.x + ball.dx < ballRadius) {
            ball.dx = -ball.dx;
        }

        if (ball.y + ball.dy < ballRadius) {
            ball.dy = -ball.dy;
        } else if (ball.y + ball.dy > canvas.height - ballRadius) {
            if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
                ball.dy = -ball.dy;
                score++; // Increase score when ball hits paddle

                // Add an extra ball every 10 points
                if (score % 10 === 0 && score !== 0) {
                    balls.push(createBall(canvas.width / 2, canvas.height - 50, initialBallSpeed, -initialBallSpeed));
                }
            } else {
                balls.splice(balls.indexOf(ball), 1); // Remove ball if it hits the bottom
            }
        }

        ball.x += ball.dx;
        ball.y += ball.dy;
    });

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    requestAnimationFrame(draw);
}

draw();
