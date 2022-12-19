//This creates a 2D array using an arrow function and the magic of JS arrays.

var board = new Array(7).fill(0).map(square => (new Array(6).fill(0)));

//My constants for what each possible value in a square is
const EMPTY_SQUARE = 0;
const PLAYER_1_TOKEN = 1;
const PLAYER_2_TOKEN = 2;
const COLUMN_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
var p1TokenCount = 21;
var p2TokenCount = 21;
var currentTurn = 1;
var player1Name = "";
var player2Name = "";

game = () => {
    player1Name = prompt("Player 1, Enter your name: ", "Your name");
    let p1BirfDay = prompt("Player 1, enter your birthday: ", "01-01-1999");
    player2Name = prompt("Player 2, Enter your name: ", "Your name");
    let p2BirfDay = prompt("Player 2, enter your birthday: ", "01-01-1999");
    
    if(Math.random() > .5) currentTurn = 2;

    document.getElementById("Player1").innerHTML = player1Name;
    document.getElementById("Player2").innerHTML = player2Name;
    updateTokens(1);
    updateTokens(2);
    alert(`Click ok to begin ${(currentTurn === 1 ? player1Name : player2Name)}'s turn`);
    setInterval(updateTime, 1000);

    fillTable();

};

fillTable = () => {
    let bTable = document.getElementById("board");

    for(let i = 0; i < 6; i++) {
        let row = document.createElement('tr');
        row.classList.add("row-" + (i + 1));
        
        for(let c = 0; c < 7; c++) {
            var col = document.createElement('td');
            col.classList.add('cell-'+ (i+1) + "-" + COLUMN_LETTERS[c])
            col.dataset.boardCol = c + 1;
            switch(board[c][i]){
                case EMPTY_SQUARE:
                    col.innerHTML = "<img src=\"images/white-circle.png\"></img>"
                    break;
                case PLAYER_1_TOKEN:
                    col.innerHTML = "<img src=\"images/black-circle.png\"></img>"
                    break;
                case PLAYER_2_TOKEN:
                    col.innerHTML = "<img src=\"images/red-circle.png\"></img>"
                    break;
            }

            col.addEventListener('click', (e) => {
                dropToken(e);
            });

            row.appendChild(col);   
        }
        bTable.appendChild(row);   
    }
};

updateTable = () => {

    for(let i = 0; i < 6; i++) {
        row = i + 1;
        for(let c = 0; c < 7; c++) {
            let col = document.getElementsByClassName('cell-'+ (i+1) + "-" + COLUMN_LETTERS[c])[0]
            switch(board[c][i]){
                case EMPTY_SQUARE:
                    col.innerHTML = "<img src=\"images/white-circle.png\"></img>"
                    break;
                case PLAYER_1_TOKEN:
                    col.innerHTML = "<img src=\"images/black-circle.png\"></img>"
                    break;
                case PLAYER_2_TOKEN:
                    col.innerHTML = "<img src=\"images/red-circle.png\"></img>"
                    break;
            } 
        }  
    }
};

dropToken = cellName => {
    column = parseInt(cellName.currentTarget.dataset.boardCol);
    let valid = false;
    for(let row = 5; row >= 0; row--) {
        if(!board[column - 1][row]) {
            valid = true;
            board[column - 1][row] = currentTurn;
            break;
        }
    }

    if(!valid) {
        alert("That column is full!")
        return;
    }

    updateTable();
    currentTurn === 1 ? --p1TokenCount : --p2TokenCount;
    updateTokens(currentTurn);

    winner = checkScores();
    if(winner) { 
        gameOver(winner);
        return;
    }

    currentTurn === 1 ? currentTurn = 2 : currentTurn = 1;
    alert(`Click ok to begin ${(currentTurn === 1 ? player1Name : player2Name)}'s turn`);
    
}

updateTokens = playerNum => {
    document.getElementById("P"+ playerNum +"Tokens").innerHTML = playerNum === 1 ? p1TokenCount : p2TokenCount;
}

updateTime = () => {
    timer = document.getElementById("Timer");
    timer.innerHTML = parseInt(timer.innerHTML) + 1;
}

checkScores = () => {
    for(let columns = 0; columns < 7; columns++) {
        for(let rows = 0; rows < 6; rows++) {
            currentNumber = board[columns][rows];
            if(currentNumber) {
                if(columns + 3 < 7 && board[columns + 1][rows] === currentNumber) {
                    if(board[columns+2][rows] === currentNumber) {
                        if(board[columns + 3][rows] === currentNumber) {
                            return currentNumber;
                        }
                    }
                }
                if(rows + 3 < 6 && board[columns][rows + 1] === currentNumber) {
                    if(board[columns][rows+2] === currentNumber) {
                        if(board[columns][rows+3] === currentNumber) {
                            return currentNumber;
                        }
                    }
                }
                if(rows + 3 < 6 && columns + 3 < 7 && board[columns + 1][rows + 1] === currentNumber) {
                    if(board[columns + 2][rows + 2] === currentNumber) {
                        if(board[columns + 3][rows + 3] === currentNumber) {
                            return currentNumber;
                        }
                    }
                }
                if(rows - 3 >= 0 && columns + 3 < 7 && board[columns + 1][rows - 1] === currentNumber) {
                    if(board[columns + 1][rows - 2] === currentNumber) {
                        if(board[columns + 1][rows - 3] === currentNumber) {
                            return currentNumber;
                        }
                    }
                }
            }
        }
    }
    return 0;
}

gameOver = winner => {
    clearInterval(updateTime);
    winnerName = winner === 1 ? player1Name : player2Name;
    timeToWin = parseInt(document.getElementById("Timer").innerHTML);
    alert("Congratulations " + winnerName +"! You win!")
    add(winnerName, timeToWin);
}

add = (name, time) => {

    if (typeof(Storage) !== "undefined") {
        if (localStorage.length === 0) {
            localStorage.setItem(0, [name, time])
        }
        else if(localStorage.length < 10) {
            var i = localStorage.length;
            for(let ind = 0; ind < i; ind++) {
                score = localStorage.getItem(ind).split(",")
                if(score[1] < time) {
                    let tempName = score[0];
                    let tempTime = score[1];
                    localStorage.setItem(ind, [name, time]);
                    name = tempName;
                    time = tempTime;
                }
            }
            localStorage.setItem(i, [name, time]);
        }
        else {
            var i = localStorage.length;
            for(let ind = 0; ind < i; ind++) {
                score = localStorage.getItem(ind).split(",");
                if(score[1] < time) {
                    let tempName = score[0];
                    let tempTime = score[1];
                    localStorage.setItem(ind, [name, time]);
                    name = tempName;
                    time = tempTime;
                }
            }
        }
    }

    scoreTable();
}

scoreTable = () => {
    document.getElementById("board").innerHTML = "";
    let table = document.getElementById("scores");
    let header= document.createElement('tr');
    let names = document.createElement('td');
    names.innerHTML = "Players Name";
    let times = document.createElement('td');
    times.innerHTML = "Times";
    header.appendChild(names);
    header.appendChild(times);
    table.appendChild(header);

    let scores;
    for(scores = 0; scores < localStorage.length; scores++) {
        let row = document.createElement('tr')
        let score = localStorage.getItem(scores).split(',');
        let name = document.createElement('td');
        let time = document.createElement('td');
        name.innerHTML = score[0];
        time.innerHTML = score[1];
        row.appendChild(name);
        row.appendChild(time);
        table.appendChild(row);
    }
    for(let blanks = scores; blanks < 10; blanks++) {
        let row = document.createElement('tr')
        let name = document.createElement('td');
        let time = document.createElement('td');
        name.innerHTML = "---";
        time.innerHTML = "---";
        row.appendChild(name);
        row.appendChild(time);
        table.appendChild(row);
    }

}