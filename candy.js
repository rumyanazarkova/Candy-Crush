
let candies = ["Blue", "Orange", "Green", "Purple", "Red", "Yellow"];
let board = [];
let rows = 9;
let columns = 9;
let score = 0;

let currTile;
let otherTile;

window.onload = function () {
    startGame()


    window.setInterval(function () {
        crushCandy();
        slideCandy();
        generateCandy();
    }, 100)
}

function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)]; 

}

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = []
        for (let c = 0; c < columns; c++) {
           
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";

            
            tile.addEventListener("dragstart", dragStart); 
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter); 
            tile.addEventListener("dragleave", dragLeave); 
            tile.addEventListener("drop", dragDrop); 
            tile.addEventListener("dragend", dragEnd); 

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row)
    }
}

function dragStart() {

    currTile = this


}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this

}

function dragEnd() {
    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return
    }

    let currCoods = currTile.id.split("-");
    let r = parseInt(currCoods[0]);
    let c = parseInt(currCoods[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c - 1 && r == r2;
    let moveRight = c2 == c + 1 && r == r2;

    let moveUp = r2 == r - 1 && c == c2;
    let moveDown = r2 == r + 1 && c == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();
        if (!validMove) {
            let currImg = currTile.src;
            let otherImg = otherTile.src;

            currTile.src = otherImg;
            otherTile.src = currImg;

        }
    }
}

function crushCandy() {
    crushChoco();
    crushFour();
    crushThree();
    document.getElementById("score").innerText = score;
}



function crushThree() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];



            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];

            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
            }
        }
    }
}


function crushFour() {

    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            let candy4 = board[r][c + 3];


            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/Choco.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";

                score += 40;
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            let candy4 = board[r + 3][c];



            if (candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/Choco.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                candy4.src = "./images/blank.png";

            }
        }
    }
}


function crushChoco() {

    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];

            if (candy1.src.includes("Choco") && candy2.src == candy3.src) {
                console.log('enters rows');
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }

            if (candy2.src.includes("Choco") && candy1.src == candy3.src) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }

            if (candy3.src.includes("Choco") && candy1.src == candy2.src) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }


        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];

            if (candy1.src.includes("Choco") && candy2.src == candy3.src) {
                console.log('enters columns');
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }

            if (candy2.src.includes("Choco") && candy1.src == candy3.src) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }

            if (candy3.src.includes("Choco") && candy1.src == candy2.src) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }
}



function checkValid() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];

            if (candy1.src.includes("Choco") && candy2.src == candy3.src) {
                return true
            }

            if (candy2.src.includes("Choco") && candy1.src == candy3.src) {
                return true
            }

            if (candy3.src.includes("Choco") && candy1.src == candy2.src) {
                return true
            }

            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];


            if (candy1.src.includes("Choco") && candy2.src == candy3.src) {
                return true
            }

            if (candy2.src.includes("Choco") && candy1.src == candy3.src) {
                return true
            }

            if (candy3.src.includes("Choco") && candy1.src == candy2.src) {
                return true
            }

            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true
            }


        }
    }
    return false
}


function slideCandy() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = columns - 1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1
            }
        }

        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./images/blank.png"
        }
    }
}

function generateCandy() { //only the top row needed to generate
    for (let c = 0; c < columns; c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./images/" + randomCandy() + ".png";
        }
    }

}





