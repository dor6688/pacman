document.addEventListener('DOMContentLoaded', function () {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    document.getElementById("defaultOpen").click();
});

let shape = {};
let enemy = {};
let enemy2 = {};
let enemy3 = {};
let bonus = {};
let board;
let score;
let pac_color;
let interval;
let intervalGhost;
let intervalBonus;
let intervalReady;
let life;
let globalNumberOfBall;
let globalNumberOfGhost;
let globalTime;
let downloadTimer;// timer
let keysDown = {};
let keyUp;
let keyDown;
let keyLeft;
let keyRight;
let gameTime;
let currentPlayer;
let audioGame = new Audio('Pacman.mp3');
let counter = 0;

let mapUsers = [];
addAdmin();

function addAdmin() {
    mapUsers.push({username: "a", password: "a", fname: "a", lname: "a", email: "a@a", dateBirth: "10/10/10"});
}

function Start(balls, numberOfGhost) {
    gameTime = new Date();
    board = [];
    score = 0;
    shape.dir = 4; // default direction
    pac_color = "yellow";
    life = 3;
    document.getElementById("userPlayer").innerText = currentPlayer.username;
    document.getElementById("numberOfBalls").innerText = globalNumberOfBall;
    document.getElementById("numberOfGhost").innerText = globalNumberOfGhost;
    document.getElementById("timeOfGame").innerText = globalTime;


    let food_remain = balls;
    let food_point_1 = parseInt(food_remain * 0.6);
    let food_point_2 = parseInt(food_remain * 0.3);
    let food_point_3 = parseInt(food_remain * 0.1);
    let ghostNumber = numberOfGhost;


    for (let i = 0; i < 21; i++) {
        board[i] = [];
        for (let j = 0; j < 20; j++) {
            board[i][j] = 0;
        }
    }
    buildWalls(board);

    enemy.i = 0;
    enemy.j = 0;
    enemy.lastMove = [enemy.i, enemy.j];
    enemy.eat = 0;
    board[enemy.i][enemy.j] = 6;
    if (ghostNumber > 1) {
        enemy2.i = 20;
        enemy2.j = 0;
        enemy2.lastMove = [enemy2.i, enemy2.j];
        enemy2.eat = 0;
        board[enemy2.i][enemy2.j] = 7;
    }

    if (ghostNumber > 2) {
        enemy3.i = 0;
        enemy3.j = 19;
        enemy3.lastMove = [enemy3.i, enemy3.j];
        enemy3.eat = 0;
        board[enemy3.i][enemy3.j] = 8;
    }
    // initialize pacman position
    let emptyCell = findRandomEmptyCell(board);
    while (emptyCell[0] < 3 || emptyCell[0] > 17 || emptyCell[1] < 3 || emptyCell[1] > 17) {
        emptyCell = findRandomEmptyCell(board);
    }
    shape.i = emptyCell[0];
    shape.j = emptyCell[1];
    board[shape.i][shape.j] = 5;
    bonus.i = 20;
    bonus.j = 19;
    bonus.eat = 0;
    bonus.lastMove = [bonus.i, bonus.j];
    board[bonus.i][bonus.j] = -2;

    while (food_point_1 > 0) {
        emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 1;
        food_point_1--;
    }
    while (food_point_2 > 0) {
        emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 2;
        food_point_2--;
    }
    while (food_point_3 > 0) {
        emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 3;
        food_point_3--;
    }


    addEventListener("keydown", function (e) {
        keysDown[e.key] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.key] = false;
    }, false);

    counter++;
    if (counter === 1) {
        intervalReady = setInterval(getReady, 1000);
    }
}

/**
 * Build the board of the game
 */
function buildWalls(board) {
    board[0][6] = 4;
    board[0][7] = 4;
    board[0][8] = 4;
    board[0][10] = 4;
    board[0][11] = 4;
    board[0][12] = 4;
    board[0][16] = 4;

    board[1][1] = 4;
    board[1][2] = 4;
    board[1][4] = 4;
    board[1][6] = 4;
    board[1][7] = 4;
    board[1][8] = 4;
    board[1][10] = 4;
    board[1][11] = 4;
    board[1][12] = 4;
    board[1][14] = 4;
    board[1][16] = 4;
    board[1][18] = 4;

    board[2][1] = 4;
    board[2][2] = 4;
    board[2][4] = 4;
    board[2][6] = 4;
    board[2][7] = 4;
    board[2][8] = 4;
    board[2][10] = 4;
    board[2][11] = 4;
    board[2][12] = 4;
    board[2][14] = 4;
    board[2][18] = 4;

    board[3][1] = 4;
    board[3][2] = 4;
    board[3][4] = 4;
    board[3][6] = 4;
    board[3][7] = 4;
    board[3][8] = 4;
    board[3][10] = 4;
    board[3][11] = 4;
    board[3][12] = 4;
    board[3][14] = 4;
    board[3][15] = 4;
    board[3][16] = 4;
    board[3][18] = 4;

    board[4][18] = 4;

    board[5][1] = 4;
    board[5][2] = 4;
    board[5][4] = 4;
    board[5][5] = 4;
    board[5][6] = 4;
    board[5][7] = 4;
    board[5][8] = 4;
    board[5][10] = 4;
    board[5][11] = 4;
    board[5][12] = 4;
    board[5][14] = 4;
    board[5][16] = 4;
    board[5][17] = 4;
    board[5][18] = 4;

    board[6][1] = 4;
    board[6][2] = 4;
    board[6][6] = 4;
    board[6][14] = 4;
    board[6][18] = 4;

    board[7][1] = 4;
    board[7][2] = 4;
    board[7][4] = 4;
    board[7][6] = 4;
    board[7][8] = 4;
    board[7][9] = 4;
    board[7][10] = 4;
    board[7][12] = 4;
    board[7][14] = 4;
    board[7][16] = 4;
    board[7][18] = 4;

    board[8][1] = 4;
    board[8][2] = 4;
    board[8][4] = 4;
    board[8][8] = 4;
    board[8][10] = 4;
    board[8][12] = 4;
    board[8][14] = 4;
    board[8][16] = 4;

    board[9][4] = 4;
    board[9][5] = 4;
    board[9][6] = 4;
    board[9][8] = 4;
    board[9][10] = 4;
    board[9][12] = 4;
    board[9][16] = 4;
    board[9][17] = 4;
    board[9][18] = 4;

    board[10][0] = 4;
    board[10][1] = 4;
    board[10][2] = 4;
    board[10][4] = 4;
    board[10][5] = 4;
    board[10][6] = 4;
    board[10][10] = 4;
    board[10][12] = 4;
    board[10][13] = 4;
    board[10][14] = 4;
    board[10][16] = 4;
    board[10][17] = 4;
    board[10][18] = 4;

    board[11][4] = 4;
    board[11][5] = 4;
    board[11][6] = 4;
    board[11][8] = 4;
    board[11][10] = 4;
    board[11][12] = 4;
    board[11][16] = 4;
    board[11][17] = 4;
    board[11][18] = 4;

    board[12][1] = 4;
    board[12][2] = 4;
    board[12][4] = 4;
    board[12][8] = 4;
    board[12][10] = 4;
    board[12][12] = 4;
    board[12][14] = 4;
    board[12][16] = 4;

    board[13][1] = 4;
    board[13][2] = 4;
    board[13][4] = 4;
    board[13][6] = 4;
    board[13][8] = 4;
    board[13][9] = 4;
    board[13][10] = 4;
    board[13][12] = 4;
    board[13][14] = 4;
    board[13][16] = 4;
    board[13][18] = 4;

    board[14][1] = 4;
    board[14][2] = 4;
    board[14][6] = 4;
    board[14][14] = 4;
    board[14][18] = 4;

    board[15][1] = 4;
    board[15][2] = 4;
    board[15][4] = 4;
    board[15][5] = 4;
    board[15][6] = 4;
    board[15][7] = 4;
    board[15][8] = 4;
    board[15][10] = 4;
    board[15][11] = 4;
    board[15][12] = 4;
    board[15][14] = 4;
    board[15][16] = 4;
    board[15][17] = 4;
    board[15][18] = 4;

    board[16][18] = 4;

    board[17][1] = 4;
    board[17][2] = 4;
    board[17][4] = 4;
    board[17][6] = 4;
    board[17][7] = 4;
    board[17][8] = 4;
    board[17][10] = 4;
    board[17][11] = 4;
    board[17][12] = 4;
    board[17][14] = 4;
    board[17][15] = 4;
    board[17][16] = 4;
    board[17][18] = 4;

    board[18][1] = 4;
    board[18][2] = 4;
    board[18][4] = 4;
    board[18][6] = 4;
    board[18][7] = 4;
    board[18][8] = 4;
    board[18][10] = 4;
    board[18][11] = 4;
    board[18][12] = 4;
    board[18][14] = 4;
    board[18][18] = 4;

    board[19][1] = 4;
    board[19][2] = 4;
    board[19][4] = 4;
    board[19][6] = 4;
    board[19][7] = 4;
    board[19][8] = 4;
    board[19][10] = 4;
    board[19][11] = 4;
    board[19][12] = 4;
    board[19][14] = 4;
    board[19][16] = 4;
    board[19][18] = 4;

    board[20][6] = 4;
    board[20][7] = 4;
    board[20][8] = 4;
    board[20][10] = 4;
    board[20][11] = 4;
    board[20][12] = 4;
    board[20][16] = 4;

    board[10][8] = 9;
    board[8][9] = -1;
    board[9][9] = -1;
    board[10][9] = -1;
    board[11][9] = -1;
    board[12][9] = -1;


}

/**
 * find empty cell and return this position
 * @param {[i,j]} board
 */
function findRandomEmptyCell(board) {
    let i = Math.floor((Math.random() * 21));
    let j = Math.floor((Math.random() * 20));
    while (board[i][j] !== 0) {
        i = Math.floor((Math.random() * 21));
        j = Math.floor((Math.random() * 20));
    }
    return [i, j];
}

/**
 * @return {number}
 */
function GetKeyPressed() {
    if (keysDown[keyUp] || keysDown['ArrowUp']) {
        shape.dir = 1;
        return 1;
    }
    if (keysDown[keyDown] || keysDown['ArrowDown']) {
        shape.dir = 2;
        return 2;
    }
    if (keysDown[keyLeft] || keysDown['ArrowLeft']) {
        shape.dir = 3;
        return 3;
    }
    if (keysDown[keyRight] || keysDown['ArrowRight']) {
        shape.dir = 4;
        return 4;
    }
}

/**
 * Draw the walls board
 * @param fromX
 * @param fromY
 * @param toX
 * @param toY
 */
function drawWalls(fromX, fromY, toX, toY) {
    context.beginPath();
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.strokeStyle = "blue"; //color
    context.lineWidth = 3;
    context.stroke();

}

/**
 * Draw correct pacman direction with his eye and mouse
 * @param xPacman
 * @param yPacman
 * @param raduisPacman
 * @param startPacman
 * @param endPacman
 * @param xMouse
 * @param yMouse
 * @param xEye
 * @param yEye
 * @param radiusEye
 * @param startEye
 * @param endEye
 */
function drawPacmanDirection(xPacman, yPacman, raduisPacman, startPacman, endPacman, xMouse, yMouse, xEye, yEye, radiusEye, startEye, endEye) {
    context.beginPath();
    context.arc(xPacman, yPacman, raduisPacman, startPacman, endPacman); // half circle
    context.lineTo(xMouse, yMouse);
    context.fillStyle = "yellow"; //color
    context.fill();
    context.beginPath();
    context.arc(xEye, yEye, radiusEye, startEye, endEye); // circle
    context.fillStyle = "black"; //color
    context.fill();
}

/**
 * Draw the balls of the game
 * @param x
 * @param y
 * @param radius
 * @param start
 * @param end
 * @param color - Each color has a different score
 */
function drawBalls(x, y, radius, start, end, color) {
    context.beginPath();
    context.arc(x, y, radius, start, end); // circ
    context.fillStyle = color; //color
    context.fill();
}


function clearAllInterval() {
    window.clearInterval(interval);
    window.clearInterval(intervalGhost);
    window.clearInterval(intervalBonus);
    window.clearInterval(downloadTimer);
}

/**
 * Stop the game
 * @param str - the reason that stop the game
 */
function stopGame(str) {
    audioGame.pause();
    audioGame.currentTime = 0;
    let endGameMusic = new Audio('pacman_end.wav');
    endGameMusic.play();
    clearAllInterval();
    window.alert(str);
}

/**
 * check if need to draw the border
 * @param center
 * @param sizeOfBox
 * @param i
 * @param j
 */
function isBorder(center, sizeOfBox, i, j) {
    if (i === 0 && (j < 6 || j > 12)) {
        drawWalls(center.x + 1, center.y, center.x + 1, center.y + sizeOfBox);
    }
    if (i === 20 && (j < 6 || j > 12)) {
        drawWalls(center.x + sizeOfBox - 1, center.y, center.x + sizeOfBox - 1, center.y + sizeOfBox);
    }
    if (j === 0) {
        drawWalls(center.x, center.y + 1, center.x + sizeOfBox, center.y + 1);
    }
    if (j === 19) {
        drawWalls(center.x, center.y + sizeOfBox - 1, center.x + sizeOfBox, center.y + sizeOfBox - 1);
    }
}

function isOver() {
    return life === 0 || score > 700 || overBalls();
}

function Draw() {
    let sizeOfBox = 25; // size of the box
    let img;

    document.getElementById("score").innerHTML = score; // write to the screen the player's score
    context.clearRect(0, 0, canvas.width, canvas.height); //clean board

    // check if life equal 0 and stop the game
    for (let i = 0; i < 21; i++) {
        for (let j = 0; j < 20; j++) {
            let center = {};
            center.x = i * sizeOfBox;
            center.y = j * sizeOfBox;
            // check if this cell has a border
            isBorder(center, sizeOfBox, i, j);
            switch (board[i][j]) {
                // 5 points
                case 1: {
                    drawBalls(center.x + sizeOfBox / 2, center.y + sizeOfBox / 2, 3, 0, 2 * Math.PI, "yellow");
                    break;
                }
                // 15 points
                case 2: {
                    drawBalls(center.x + sizeOfBox / 2, center.y + sizeOfBox / 2, 5, 0, 2 * Math.PI, "red");
                    break;
                }
                // 25 points
                case 3: {
                    drawBalls(center.x + sizeOfBox / 2, center.y + sizeOfBox / 2, 6, 0, 2 * Math.PI, "green");
                    break;
                }
                // walls
                case 4: {
                    if (i + 1 < 21) {
                        if (board[i + 1][j] !== 4) {
                            drawWalls(center.x + sizeOfBox, center.y, center.x + sizeOfBox, center.y + sizeOfBox);
                        }
                    }
                    if (j + 1 < 21) {
                        if (board[i][j + 1] !== 4) {
                            drawWalls(center.x, center.y + sizeOfBox, center.x + sizeOfBox, center.y + sizeOfBox);
                        }
                    }
                    if (i - 1 >= 0) {
                        if (board[i - 1][j] !== 4) {
                            drawWalls(center.x, center.y, center.x, center.y + sizeOfBox);
                        }
                    }
                    if (j - 1 >= 0) {
                        if (board[i][j - 1] !== 4) {
                            drawWalls(center.x, center.y, center.x + sizeOfBox, center.y);
                        }
                    }
                    break;
                }
                // pacman
                case 5: {
                    if (shape.dir === 1) {
                        drawPacmanDirection(center.x + sizeOfBox / 2, center.y + sizeOfBox / 2, 10, 1.65 * Math.PI, 1.35 * Math.PI,
                            center.x + sizeOfBox / 2, center.y + sizeOfBox / 2, center.x + 8, center.y + 15, 1.3, 0, 2 * Math.PI);
                    } else if (shape.dir === 2) {
                        drawPacmanDirection(center.x + sizeOfBox / 2, center.y + sizeOfBox / 2, 10, 0.65 * Math.PI, 0.35 * Math.PI,
                            center.x + sizeOfBox / 2, center.y + sizeOfBox / 2, center.x + 17, center.y + 12, 1.3, 0, 2 * Math.PI);
                    } else if (shape.dir === 3) {
                        drawPacmanDirection(center.x + sizeOfBox / 2, center.y + sizeOfBox / 2, 10, 1.15 * Math.PI, 0.85 * Math.PI,
                            center.x + sizeOfBox / 2, center.y + sizeOfBox / 2, center.x + 15, center.y + 7, 1.3, 0, 2 * Math.PI);
                    } else if (shape.dir === 4) {
                        drawPacmanDirection(center.x + sizeOfBox / 2, center.y + sizeOfBox / 2, 10, 0.15 * Math.PI, 1.85 * Math.PI,
                            center.x + sizeOfBox / 2, center.y + sizeOfBox / 2, center.x + 12, center.y + 7, 1.3, 0, 2 * Math.PI);
                    }
                    break;
                }
                // ghost 1
                case 6: {
                    img = document.getElementById("g1");
                    context.drawImage(img, center.x, center.y, canvas.width / board.length, canvas.width / board.length);
                    break;
                }
                // ghost 2
                case 7: {
                    img = document.getElementById("g2");
                    context.drawImage(img, center.x, center.y, canvas.width / board.length, canvas.width / board.length);
                    break;
                }
                // ghost 3
                case 8: {
                    img = document.getElementById("g3");
                    context.drawImage(img, center.x, center.y, canvas.width / board.length, canvas.width / board.length);
                    break;
                }
                // the white entry
                case 9: {
                    context.beginPath();
                    context.moveTo(center.x, center.y + sizeOfBox / 2);
                    context.lineTo(center.x + sizeOfBox, center.y + sizeOfBox / 2);
                    context.strokeStyle = "white"; //color
                    context.lineWidth = 3;
                    context.stroke();
                    break;
                }
                // bonus
                case -2: {
                    img = document.getElementById("cherry");
                    context.drawImage(img, center.x + 2, center.y + 2, canvas.width * 0.8 / board.length, canvas.width * 0.8 / board.length);
                    break;
                }
            }
        }
    }

    if (isOver()) {
        if (life === 0) {
            stopGame("You Lost!");
        }
        if (overBalls()) {
            stopGame("You Win !!, No more balls");
        }
    }


}

function getReady() {
    audioGame.play();
    let now = new Date();
    let millisec = now - gameTime;
    let sec = 4 - Math.floor(millisec / 1000);
    Draw();
    context.font = "100px 'Press Start 2P',  cursive";
    context.fillText(sec, canvas.width / 2 - 45, canvas.height / 2);
    if (sec === 0) {
        clearInterval(intervalReady);
        interval = setInterval(UpdatePosition, 150);
        intervalGhost = setInterval(UpdateGhostPosition, 250);
        intervalBonus = setInterval(UpdateBonusPosition, 250);
        startTime(globalTime);
        document.getElementById('reset').onclick = startNewGame;
        counter = 0;
    }
}


function nextMove(iG, jG, iP, jP) {
    let queue = [];
    let pos1 = {};
    let pos2 = {};
    let pos3 = {};
    let pos4 = {};
    let ei = iG;
    let ej = jG;
    let pi = iP;
    let pj = jP;

    if (Math.abs(ei - pi) > Math.abs(ej - pj)) {
        if (ei > pi) {
            pos1.i = ei - 1;
            pos1.j = ej;
            queue.push(pos1);
            if (ej > pj) {
                pos2.i = ei;
                pos2.j = ej - 1;
                queue.push(pos2);
                pos3.i = ei;
                pos3.j = ej + 1;
                queue.push(pos3);
                pos4.i = ei + 1;
                pos4.j = ej;
                queue.push(pos4);
            } else if (ej < pj) {
                pos2.i = ei;
                pos2.j = ej + 1;
                queue.push(pos2);
                pos3.i = ei;
                pos3.j = ej - 1;
                queue.push(pos3);
                pos4.i = ei + 1;
                pos4.j = ej;
                queue.push(pos4);
            } else {
                let side = Math.random();
                if (side > 0.5) {
                    pos2.i = ei;
                    pos2.j = ej + 1;
                    queue.push(pos2);
                    pos3.i = ei;
                    pos3.j = ej - 1;
                    queue.push(pos3);
                    pos4.i = ei + 1;
                    pos4.j = ej;
                    queue.push(pos4);
                } else {
                    pos2.i = ei;
                    pos2.j = ej - 1;
                    queue.push(pos2);
                    pos3.i = ei;
                    pos3.j = ej + 1;
                    queue.push(pos3);
                    pos4.i = ei + 1;
                    pos4.j = ej;
                    queue.push(pos4);
                }

            }
        } else {
            pos1.i = ei + 1;
            pos1.j = ej;
            queue.push(pos1);
            if (ej > pj) {
                pos2.i = ei;
                pos2.j = ej - 1;
                queue.push(pos2);
                pos3.i = ei;
                pos3.j = ej + 1;
                queue.push(pos3);
                pos4.i = ei - 1;
                pos4.j = ej;
                queue.push(pos4);
            } else if (ej < pj) {
                pos2.i = ei;
                pos2.j = ej + 1;
                queue.push(pos2);
                pos3.i = ei;
                pos3.j = ej - 1;
                queue.push(pos3);
                pos4.i = ei - 1;
                pos4.j = ej;
                queue.push(pos4);
            } else {
                let side = Math.random();
                if (side > 0.5) {
                    pos2.i = ei;
                    pos2.j = ej - 1;
                    queue.push(pos2);
                    pos3.i = ei;
                    pos3.j = ej + 1;
                    queue.push(pos3);
                    pos4.i = ei - 1;
                    pos4.j = ej;
                    queue.push(pos4);
                } else {
                    pos2.i = ei;
                    pos2.j = ej + 1;
                    queue.push(pos2);
                    pos3.i = ei;
                    pos3.j = ej - 1;
                    queue.push(pos3);
                    pos4.i = ei - 1;
                    pos4.j = ej;
                    queue.push(pos4);
                }
            }
        }
    } else {
        if (ej > pj) {
            pos1.i = ei;
            pos1.j = ej - 1;
            queue.push(pos1);
            if (ei > pi) {
                pos2.i = ei - 1;
                pos2.j = ej;
                queue.push(pos2);
                pos3.i = ei + 1;
                pos3.j = ej;
                queue.push(pos3);
                pos4.i = ei;
                pos4.j = ej + 1;
                queue.push(pos4);
            } else if (ei < pi) {
                pos2.i = ei + 1;
                pos2.j = ej;
                queue.push(pos2);
                pos3.i = ei - 1;
                pos3.j = ej;
                queue.push(pos3);
                pos4.i = ei;
                pos4.j = ej + 1;
                queue.push(pos4);
            } else {
                let side = Math.random();
                if (side > 0.5) {
                    pos2.i = ei - 1;
                    pos2.j = ej;
                    queue.push(pos2);
                    pos3.i = ei + 1;
                    pos3.j = ej;
                    queue.push(pos3);
                    pos4.i = ei;
                    pos4.j = ej + 1;
                    queue.push(pos4);
                } else {
                    pos2.i = ei + 1;
                    pos2.j = ej;
                    queue.push(pos2);
                    pos3.i = ei - 1;
                    pos3.j = ej;
                    queue.push(pos3);
                    pos4.i = ei;
                    pos4.j = ej + 1;
                    queue.push(pos4);
                }
            }
        } else {
            pos1.i = ei;
            pos1.j = ej + 1;
            queue.push(pos1);
            if (ei > pi) {
                pos2.i = ei - 1;
                pos2.j = ej;
                queue.push(pos2);
                pos3.i = ei + 1;
                pos3.j = ej;
                queue.push(pos3);
                pos4.i = ei;
                pos4.j = ej - 1;
                queue.push(pos4);
            } else if (ei < pi) {
                pos2.i = ei + 1;
                pos2.j = ej;
                queue.push(pos2);
                pos3.i = ei - 1;
                pos3.j = ej;
                queue.push(pos3);
                pos4.i = ei;
                pos4.j = ej - 1;
                queue.push(pos4);
            } else {
                let side = Math.random();
                if (side > 0.5) {
                    pos2.i = ei + 1;
                    pos2.j = ej;
                    queue.push(pos2);
                    pos3.i = ei - 1;
                    pos3.j = ej;
                    queue.push(pos3);
                    pos4.i = ei;
                    pos4.j = ej - 1;
                    queue.push(pos4);
                } else {
                    pos2.i = ei - 1;
                    pos2.j = ej;
                    queue.push(pos2);
                    pos3.i = ei + 1;
                    pos3.j = ej;
                    queue.push(pos3);
                    pos4.i = ei;
                    pos4.j = ej - 1;
                    queue.push(pos4);
                }
            }
        }
    }
    return queue;
}


function UpdateGhostPosition() {
    board[enemy.i][enemy.j] = enemy.eat;

    let queue = nextMove(enemy.i, enemy.j, shape.i, shape.j);

    while (queue.length > 0) {

        let next = queue.shift();

        if (next.i >= 0 && next.i <= 20 && next.j >= 0 && next.j <= 19 && board[next.i][next.j] !== 4 && board[next.i][next.j] !== 9) {
            // i = 20 , j = 9
            if (next.i === 0 && next.j === 9) {
                enemy.lastMove[0] = enemy.i;
                enemy.lastMove[1] = enemy.j;
                enemy.i = 20;
                enemy.j = next.j;
                break;
            }

            if (next.i === 20 && next.j === 9) {
                enemy.lastMove[0] = enemy.i;
                enemy.lastMove[1] = enemy.j;
                enemy.i = 0;
                enemy.j = next.j;
                break;
            }


            if (enemy.lastMove[0] !== next.i || enemy.lastMove[1] !== next.j) {
                enemy.lastMove[0] = enemy.i;
                enemy.lastMove[1] = enemy.j;
                enemy.i = next.i;
                enemy.j = next.j;
                break;
            }
        }
    }
    if (board[enemy.i][enemy.j] === 7 || board[enemy.i][enemy.j] === 8 || board[enemy.i][enemy.j] === -2) {
        board[enemy.i][enemy.j] = 0;
    }
    enemy.eat = board[enemy.i][enemy.j];

    if (globalNumberOfGhost > 1) {
        board[enemy2.i][enemy2.j] = enemy2.eat;

        let queue2 = nextMove(enemy2.i, enemy2.j, shape.i, shape.j);
        while (queue2.length > 0) {

            let next = queue2.shift();

            if (next.i >= 0 && next.i <= 20 && next.j >= 0 && next.j <= 19 && board[next.i][next.j] !== 4 && board[next.i][next.j] !== 9) {
                if (next.i === 0 && next.j === 9) {
                    enemy2.lastMove[0] = enemy2.i;
                    enemy2.lastMove[1] = enemy2.j;
                    enemy2.i = 20;
                    enemy2.j = next.j;
                    break;
                }

                if (next.i === 20 && next.j === 9) {
                    enemy2.lastMove[0] = enemy2.i;
                    enemy2.lastMove[1] = enemy2.j;
                    enemy2.i = 0;
                    enemy2.j = next.j;
                    break;
                }

                if (enemy2.lastMove[0] !== next.i || enemy2.lastMove[1] !== next.j) {
                    enemy2.lastMove[0] = enemy2.i;
                    enemy2.lastMove[1] = enemy2.j;
                    enemy2.i = next.i;
                    enemy2.j = next.j;
                    break;
                }
            }
        }
        if (board[enemy2.i][enemy2.j] === 6 || board[enemy2.i][enemy2.j] === 8 || board[enemy2.i][enemy2.j] === -2) {
            board[enemy2.i][enemy2.j] = 0;
        }
        enemy2.eat = board[enemy2.i][enemy2.j];
    }

    if (globalNumberOfGhost > 2) {

        board[enemy3.i][enemy3.j] = enemy3.eat;


        let queue3 = nextMove(enemy3.i, enemy3.j, shape.i, shape.j);
        while (queue3.length > 0) {

            let next = queue3.shift();

            if (next.i >= 0 && next.i <= 20 && next.j >= 0 && next.j <= 19 && board[next.i][next.j] !== 4 && board[next.i][next.j] !== 9) {
                if (next.i === 0 && next.j === 9) {
                    enemy3.lastMove[0] = enemy3.i;
                    enemy3.lastMove[1] = enemy3.j;
                    enemy3.i = 20;
                    enemy3.j = next.j;
                    break;
                }

                if (next.i === 20 && next.j === 9) {
                    enemy3.lastMove[0] = enemy3.i;
                    enemy3.lastMove[1] = enemy3.j;
                    enemy3.i = 0;
                    enemy3.j = next.j;
                    break;
                }

                if (enemy3.lastMove[0] !== next.i || enemy3.lastMove[1] !== next.j) {
                    enemy3.lastMove[0] = enemy3.i;
                    enemy3.lastMove[1] = enemy3.j;
                    enemy3.i = next.i;
                    enemy3.j = next.j;
                    break;
                }
            }
        }
        if (board[enemy3.i][enemy3.j] === 6 || board[enemy3.i][enemy3.j] === 7 || board[enemy3.i][enemy3.j] === -2) {
            board[enemy3.i][enemy3.j] = 0;
        }
        enemy3.eat = board[enemy3.i][enemy3.j];
    }


    let flag = false;

    if (globalNumberOfGhost === "3") {
        if (board[enemy.i][enemy.j] === 5 || board[enemy2.i][enemy2.j] === 5 || board[enemy3.i][enemy3.j] === 5) {
            flag = true;
        }
    }
    if (globalNumberOfGhost === "2") {
        if (board[enemy.i][enemy.j] === 5 || board[enemy2.i][enemy2.j] === 5) {
            flag = true;
        }
    }
    if (globalNumberOfGhost === "1") {
        if (board[enemy.i][enemy.j] === 5) {
            flag = true;
        }
    }
    if (flag) {
        isEat();
    }

    board[enemy.i][enemy.j] = 6;
    if (globalNumberOfGhost > 1) {
        board[enemy2.i][enemy2.j] = 7;
    }
    if (globalNumberOfGhost > 2) {
        board[enemy3.i][enemy3.j] = 8;
    }
}

function isEat() {
    audioGame.pause();
    audioGame.currentTime = 0;
    let dead = new Audio('pacman_death.wav');
    dead.play();
    audioGame.play();
    board[shape.i][shape.j] = 0;
    let emptyCell = findRandomEmptyCell(board);
    while (emptyCell[0] < 3 || emptyCell[0] > 17 || emptyCell[1] < 3 || emptyCell[1] > 17) {
        emptyCell = findRandomEmptyCell(board);
    }
    shape.i = emptyCell[0];
    shape.j = emptyCell[1];
    enemy.eat = 0;
    enemy.i = 0;
    enemy.j = 0;
    if (globalNumberOfGhost > 1) {
        enemy2.eat = 0;
        enemy2.i = 20;
        enemy2.j = 0;
    }
    if (globalNumberOfGhost > 2) {
        enemy3.eat = 0;
        enemy3.i = 0;
        enemy3.j = 19;
    }
    score -= 10;
    life -= 1;
    if (life === 2) {
        document.getElementById("pacman_life3").style.display = "none";
    }
    if (life === 1) {
        document.getElementById("pacman_life2").style.display = "none";
    }
    if (life === 0) {
        document.getElementById("pacman_life1").style.display = "none";
    }
}

/**
 * Update the position of the Bonus
 */
function UpdateBonusPosition() {

    board[bonus.i][bonus.j] = bonus.eat;
    bonus.lastMove[0] = bonus.i;
    bonus.lastMove[1] = bonus.j;
    while (true) {
        let rand = Math.random();
        if (rand < 0.25) {
            // i++
            if (bonus.i + 1 < 20 && board[bonus.i + 1][bonus.j] !== 4) {
                if (bonus.lastMove[0] !== bonus.i + 1 || bonus.lastMove[1] !== bonus.j) {
                    bonus.i++;
                    break;
                }
            }
        } else if (0.25 <= rand && rand < 0.5) {
            // i--
            if (bonus.i - 1 >= 0 && board[bonus.i - 1][bonus.j] !== 4) {
                if (bonus.lastMove[0] !== bonus.i - 1 || bonus.lastMove[1] !== bonus.j) {
                    bonus.i--;
                    break;
                }
            }
        } else if (0.5 <= rand && rand < 0.75) {
            // j++
            if (bonus.j + 1 < 20 && board[bonus.i][bonus.j + 1] !== 4) {
                if (bonus.lastMove[0] !== bonus.i || bonus.lastMove[1] !== bonus.j + 1) {
                    bonus.j++;
                    break;
                }
            }
        } else {
            //j--
            if (bonus.j - 1 >= 0 && board[bonus.i][bonus.j - 1] !== 4) {
                if (bonus.lastMove[0] !== bonus.i || bonus.lastMove[1] !== bonus.j - 1) {
                    bonus.j--;
                    break;
                }
            }
        }
    }
    bonus.eat = board[bonus.i][bonus.j];

    if (bonus.eat === 5) {
        bonus.eat = 0;
        score += 50;
        board[bonus.i][bonus.j] = 0;
        console.log("bonus eat !");
        clearInterval(intervalBonus);
    }
    board[bonus.i][bonus.j] = -2;
}

/**
 * Update the position of the player
 */
function UpdatePosition() {
    board[shape.i][shape.j] = 0;
    // get direction from the key pressed
    let direction = GetKeyPressed();
    switch (direction) {
        case 1: {
            if (shape.j > 0 && board[shape.i][shape.j - 1] !== 4 && board[shape.i][shape.j - 1] !== 9) {
                shape.j--;
            }
            break;
        }
        case 2: {
            if (shape.j < 19 && board[shape.i][shape.j + 1] !== 4 && board[shape.i][shape.j + 1] !== 9) {
                shape.j++;
            }
            break;
        }
        case 3: {
            if (shape.i === 0 && shape.j === 9) {
                shape.i = 20;
            } else {
                if (shape.i > 0 && board[shape.i - 1][shape.j] !== 4 && board[shape.i - 1][shape.j] !== 9) {
                    shape.i--;
                }
            }
            break;
        }
        case 4: {
            if (shape.i === 20 && shape.j === 9) {
                shape.i = 0;
            } else {
                if (shape.i < 20 && board[shape.i + 1][shape.j] !== 4 && board[shape.i + 1][shape.j] !== 9) {
                    shape.i++;
                }
            }
            break;
        }
    }

    addScore(board[shape.i][shape.j]);

    if (board[shape.i][shape.j] === -2) {
        console.log("pacman eat bonus !");
    }
    if (board[shape.i][shape.j] === 6) {
        isEat();
        clearGhost();
        console.log("pacman eat g1 !");
    }
    if (board[shape.i][shape.j] === 7) {
        isEat();
        clearGhost();
        console.log("pacman eat g2 !");
    }
    if (board[shape.i][shape.j] === 8) {
        isEat();
        clearGhost();
        console.log("pacman eat g3 !");
    }
    board[shape.i][shape.j] = 5;

    Draw();

}

function clearGhost() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] === 6 || board[i][j] === 7 || board[i][j] === 8) {
                board[i][j] = 0;
            }
        }
    }
}

function overBalls() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] === 1 || board[i][j] === 2 || board[i][j] === 3) {
                return false;
            }
        }
    }
    return true;
}

/**
 * get type of ball and add it to score
 * @param type
 */
function addScore(type) {
    if (type === 1) {
        score += 5;
    }
    if (type === 2) {
        score += 15;
    }
    if (type === 3) {
        score += 25;
    }
    if (type === -2) {
        score += 50;
        board[bonus.i][bonus.j] = 0;
        clearInterval(intervalBonus);
    }
}

/**
 * moved in tab page
 * show only the current tab page and hide all the other
 * @param evt
 * @param pageName
 */
function openPage(evt, pageName) {
    clearAllInterval();
    audioGame.pause();
    audioGame.currentTime = 0;
    // Declare all variables
    let i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(pageName).style.display = "block";
    evt.currentTarget.className += " active";
}

/**
 * Check information for new user
 * 1. all field filled
 * 2. password contain at least 8 character include number and letter
 * 3. first name and last name don't include number
 * 4. check if the mail is valid include @
 */
function detailValidationNewUser(event) {
    let userName = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let firstName = document.getElementById("firstname").value;
    let lastName = document.getElementById("lastname").value;
    let userEmail = document.getElementById("email").value;
    let birthDate = document.getElementById("DOBDay").value + "/" + document.getElementById("DOBMonth").value + "/" + document.getElementById("DOBYear").value;


    if ($('form[name=\'registration\']').valid()) {
        for (let i = 0; i < mapUsers.length; i++) {
            var user = mapUsers[i];
            if (user.username === userName) {
                alert("UserName already exists");
                return;
            }
        }
        $('#Register button').prop('disabled', false);        // enables button
        // create new user and save him in the list of users
        mapUsers.push({
            username: userName,
            password: password,
            fname: firstName,
            lname: lastName,
            email: userEmail,
            dateBirth: birthDate
        });
        window.alert("registered succefuly");
        clearInputs();
        openPage(event, 'Welcome');
    } else {
        // didn't finish to complete all the fields
        alert("NOT FINISHED");
    }
}

/**
 * Clear the input fields and write the placeholder
 */
function clearInputs() {
    // username
    document.getElementById("username").value = "";
    document.getElementById("username").placeholder = "pacman123";
    // password
    let placeholderDefault = document.getElementById("password").placeholder;
    document.getElementById("password").value = "";
    document.getElementById("password").placeholder = placeholderDefault;
    // first name
    document.getElementById("firstname").value = "";
    document.getElementById("firstname").placeholder = "Pacman";
    // last name
    document.getElementById("lastname").value = "";
    document.getElementById("lastname").placeholder = "Ghost";
    // email
    document.getElementById("email").value = "";
    document.getElementById("email").placeholder = "pacman@eat.com";
    // date birth
    document.getElementById("datepicker").value = "";
    document.getElementById("datepicker").placeholder = "dd/mm/yyyy";
}

/**
 * count down timer per 1 second
 * @param time - start time
 */
function startTime(time) {
    let timeleft = time;
    downloadTimer = setInterval(function () {
        document.getElementById("countdown").innerHTML = timeleft;
        timeleft -= 1;
        if (timeleft <= 0) {
            let msg;
            if (score < 150) {
                msg = "You can do better " + score;
            } else {
                msg = "We have a winner";
            }
            document.getElementById("countdown").innerHTML = "Finished";
            stopGame(msg);
        }
    }, 1000);
}

/**
 * Check if user exist
 *      check if username equals to his password
 * @param username
 * @param password
 * @returns {boolean}
 */
function checkUserPassword(username, password) {
    for (let i = 0; i < mapUsers.length; i++) {
        if (mapUsers[i].username === username && mapUsers[i].password === password) {
            currentPlayer = mapUsers[i];
            return true;
        }
    }
    return false;
}

/**
 * check validation of user
 * @param event
 */
function checkUser(event) {
    let userName = document.getElementById("userName_Login").value;
    let userPassword = document.getElementById("userPassword_Login").value;
    if (checkUserPassword(userName, userPassword)) {
        // clear the fields
        document.getElementById("userName_Login").value = "";
        document.getElementById("userPassword_Login").value = "";
        // correct password, move to the game !
        openPage(event, 'Setting');
    } else {
        // incorrect password, pop error message !
        window.alert("Wrong user name or password");
    }
}

function changeSetting() {
    clearAllInterval();
    audioGame.pause();
    audioGame.currentTime = 0;
    openPage(event, 'Setting');
}

/**
 * Start New Game
 * 1. show all live again
 * 2. clear timer and start again
 * 3. clear ghost and pacman update position
 * 4. start again
 */
function startNewGame() {
    audioGame.pause();
    audioGame.currentTime = 0;
    document.getElementById("pacman_life1").style.display = "block";
    document.getElementById("pacman_life2").style.display = "block";
    document.getElementById("pacman_life3").style.display = "block";
    clearAllInterval();
    Start(globalNumberOfBall, globalNumberOfGhost);
}

function keyPressed(event, id) {
    let key = event.key;
    document.getElementById(id).value = "";
    document.getElementById(id).value = key;

}


/**
 * Set default setting :
 * balls between 50 -90
 * time between 60 - 120
 * ghost between 1 -3
 * arrow will be for movement
 */
function defaultData() {
    document.getElementById('rangevalue').value = 10 * Math.floor((Math.random() * 5) + 5);
    document.getElementById('rangetimevalue').value = Math.floor((Math.random() * 60) + 60);
    document.getElementById('rangeghostvalue').value = Math.floor((Math.random() * 3) + 1);
    document.getElementById('upArrow').value = 'ArrowUp';
    document.getElementById('downArrow').value = 'ArrowDown';
    document.getElementById('leftArrow').value = 'ArrowLeft';
    document.getElementById('rightArrow').value = 'ArrowRight';
}

/**
 * save all the setting that chosen
 * start game, timer and moved to the tab of the game
 */
function updateSettings() {
    globalNumberOfBall = document.getElementById('rangevalue').value;
    globalTime = document.getElementById('rangetimevalue').value;
    globalNumberOfGhost = document.getElementById('rangeghostvalue').value;
    keyUp = document.getElementById('upArrow').value;
    keyDown = document.getElementById('downArrow').value;
    keyLeft = document.getElementById('leftArrow').value;
    keyRight = document.getElementById('rightArrow').value;
    Start(globalNumberOfBall, globalNumberOfGhost);
    openPage(event, 'Game');
}

//******* jquery **********
// Wait for the DOM to be ready

$(window).bind("load", function () {
    var datepicker = new ej.calendars.DatePicker({width: "100%", format: 'dd-MM-yyyy', cssClass: "style"});
    datepicker.appendTo('#datepicker');

    jQuery.validator.addMethod("passwordCheck",
        function (value, element, param) {
            if (this.optional(element)) {
                return true;
            } else if (!/[A-z]/.test(value)) {
                return false;
            } else if (!/[0-9]/.test(value)) {
                return false;
            }

            return true;
        });
    jQuery.validator.addMethod("stringOnlyLetters",
        function (value, element, param) {
            if (this.optional(element)) {
                return true;
            } else return /^[a-zA-Z]+$/.test(value)


        });

    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    $("form[name='registration']").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            username: "required",
            firstname: {
                required: true,
                stringOnlyLetters: true
            },
            lastname: {
                required: true,
                stringOnlyLetters: true
            },
            email: {
                required: true,
                // Specify that email should be validated
                // by the built-in "email" rule
                email: true
            },
            password: {
                required: true,
                minlength: 8,
                passwordCheck: true
            },

            datepicker: {
                required: true
            }
        },
        // Specify validation error messages
        messages: {
            username: "Please enter user name",
            firstname: {
                required: "Please enter your firstname",
                stringOnlyLetters: "first name can cointain only letters"
            },
            lastname: {
                required: "Please enter your lastname",
                stringOnlyLetters: "last name can cointain only letters"
            },
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 8 characters long",
                passwordCheck: "password must contain letters and numbers"
            },
            email: "Please enter a valid email address",
            datepicker: "Please enter a Birth  date"
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
    });
});
