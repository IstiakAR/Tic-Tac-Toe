class Player{
    constructor(symbol){
        this.symbol = symbol;
    }
}

class GameController{
    constructor(){
        this.player1 = new Player('X');
        this.player2 = new Player('O');
        this.currentPlayer = this.player1;
        this.gameOver = false;
        this.squares = Array.from(document.querySelectorAll('[id^="square"]'));
        this.score1 = document.getElementById('score1');
        this.score2 = document.getElementById('score2');
        this.score1.textContent = 0;
        this.score2.textContent = 0;
        this.currentPlayerIndicator = document.getElementById('current-player');
        this.player1Element = document.getElementById('player1');
        this.player2Element = document.getElementById('player2');
        this.updateTurnIndicator();
    }

    updateTurnIndicator() {
        this.currentPlayerIndicator.textContent = `${this.currentPlayer.symbol}'s turn`;
        
        if (this.currentPlayer === this.player1) {
            this.player1Element.classList.add('active-player');
            this.player2Element.classList.remove('active-player');
        } else {
            this.player2Element.classList.add('active-player');
            this.player1Element.classList.remove('active-player');
        }
    }

    switchPlayer(){
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
        this.updateTurnIndicator();
    }

    checkWin(){
        const winCondition = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for(let i of winCondition){
            const [a,b,c] = i;
            if(this.squares[a].textContent === this.squares[b].textContent && 
               this.squares[a].textContent === this.squares[c].textContent && 
               this.squares[a].textContent !== ''){
                this.gameOver = true;
                let winner = this.squares[a].textContent;
                this.updateScore(winner);
                this.currentPlayerIndicator.textContent = `${winner} wins!`;
                this.currentPlayer=this.player1;
                return;
            }
        }
    }
    updateScore(winner){
        console.log(`Winner: ${winner}`);
        if(winner === 'X'){
            this.score1.textContent = parseInt(this.score1.textContent) + 1;
        } else {
            this.score2.textContent = parseInt(this.score2.textContent) + 1;
        }
    }
    checkDraw(){
        for(let square of this.squares){
            if(square.textContent === ''){
                return;
            }
        }
        this.gameOver = true;
    }
    makeMove(square){
        if(square.textContent === '' && !this.gameOver){
            square.textContent = this.currentPlayer.symbol;
            this.checkWin();
            this.checkDraw();
            if(!this.gameOver){
                this.switchPlayer();
            }
        }
        else if(this.gameOver){
            this.reset(0);
            this.updateTurnIndicator();
            this.gameOver = false;
        }
    }
    reset(i=1){
        for(let s of this.squares){
            s.textContent = '';
        }
        if(i===1){
            this.score1.textContent = 0;
            this.score2.textContent = 0;
            this.updateTurnIndicator();
        }
    }
}

class MainController{
    constructor(){
        this.gameController = new GameController();
    }
    init(){
        this.gameController.squares.forEach(square => {
            square.addEventListener('click', () => {
                this.gameController.makeMove(square);
            });
        });
        this.gameController.resetButton = document.getElementById('reset');
        this.gameController.resetButton.addEventListener('click', () => {
            this.gameController.reset();
            this.gameController.gameOver = false;
            this.gameController.currentPlayer = this.gameController.player1;
        });
    }
}

const mainController = new MainController();
mainController.init();