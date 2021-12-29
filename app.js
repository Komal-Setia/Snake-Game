const canvas = document.getElementById('canvas');
const pen = canvas.getContext('2d');

pen.fillStyle = 'lightgreen';


// Height and width of the canvas element
const H = 650;
const W = 1100;
const cs = 40;
let food = null;
let score = 0;
let gameOver = false;
const gulpSound = new Audio("gulp.mp3");


const snake = {
    init_len: 3,
    direction: 'right',
    cells: [],
    
    createSnake: function () {
        for (let i = 0; i < this.init_len; i++){
            this.cells.push(
                {
                    x: i,
                    y: 0
                }
            );
        }
    },
    drawSnake: function () {
        for (let cell of this.cells) {
            pen.fillRect(cell.x*cs, cell.y*cs, cs-1, cs-1);
        }
    },
    updateSnake:function () {
        const headX = this.cells[this.cells.length - 1].x;
        const headY = this.cells[this.cells.length - 1].y;


        if (food.x === headX && food.y === headY) {
            food = getRandomFood();
            score++;
            gulpSound.play();
        } else {
            // remove the first cell
            this.cells.shift();
        }

        let nextX;
        let nextY;

        if (this.direction === 'left') {
            nextX = headX - 1;
            nextY = headY;

            if (nextX * cs < 0) {
                gameOver = true;
            }

        }
        else if (this.direction === 'up') {
            nextX = headX;
            nextY = headY - 1;
            
            if (nextY * cs < 0) {
                gameOver = true;
            }

        } else if (this.direction === 'down') {
            nextX = headX;
            nextY = headY + 1;

            if (nextY * cs >= H ) {
                gameOver = true;
            }

        } else {
            nextX = headX + 1;
            nextY = headY;

            if (nextX * cs >= W ) {
                gameOver = true;
            }
        }
        // add the cell at the and i.e after the head of the snake
        
        this.cells.push({
            x: nextX,
            y: nextY
        });

      
    }
}


// init
function init() {
    snake.createSnake();
    snake.drawSnake();
    food = getRandomFood();

    function keypressed(e) {
     
        if (e.key === 'ArrowLeft') {
            snake.direction = 'left';
        }
        else if (e.key === 'ArrowDown') {
            snake.direction = 'down';
        }
        else if (e.key === 'ArrowRight') {
            snake.direction = 'right';
        }
        else {
            snake.direction = 'up';
        }

        console.log(snake.direction);

    }
    document.addEventListener('keydown', keypressed);
}


// draw

function draw() {

    if (gameOver == true) {
        pen.font = '40px sans-serif';
        pen.fillStyle = 'red';
        pen.fillText('Game Over', 50, 100);
        console.log("GAME OVER");
        clearInterval(id);
        return;
    }
    

    pen.clearRect(0, 0, W, H);
    pen.font = '40px sans-serif';
    pen.fillStyle = 'lightgreen';
    pen.fillText(`Score : ${score}`, 50, 50);
    pen.fillStyle = 'yellow';
    pen.fillRect(food.x * cs, food.y * cs, cs, cs);
    pen.fillStyle = 'lightgreen';
    snake.drawSnake();
}

// update

function update() {
    snake.updateSnake();
}

// Game Loop
function gameLoop() {
    update();
    draw();
}

function getRandomFood() {
    
    const foodX = Math.floor(Math.random() * (W - cs) / cs);
    const foodY = Math.floor(Math.random() * (H - cs) / cs);
    
    food = {
        x: foodX,
        y:foodY
    }

    return food;
}


// start the game - initilise




init();

const id = setInterval(gameLoop, 100);
