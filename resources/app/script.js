// 將遊戲邏輯封裝到一個物件中
const TicTacToeGame = {
  board: ['', '', '', '', '', '', '', '', ''], // 棋盤狀態，空格表示空位，X表示玩家1，O表示玩家2或電腦
  currentPlayer: 'X', // 當前玩家，初始為玩家1
  gameOver: false, // 遊戲結束標誌

  // 初始化遊戲
  init() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
      cell.addEventListener('click', () => this.handleClick(index));
    });
    this.render();
    this.setupRestartButton(); // 新增設置重新開始按鈕的函數
  },

  // 玩家點擊事件處理函數
  handleClick(index) {
    if (!this.gameOver && this.board[index] === '') {
      this.board[index] = this.currentPlayer;
      this.render();
      if (this.checkWinner()) {
        this.gameOver = true;
        alert(`${this.currentPlayer} wins!`);
        this.showRestartButton();
      } else if (this.board.every(cell => cell !== '')) {
        this.gameOver = true;
        alert('It\'s a draw!');
        this.showRestartButton();
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        if (this.currentPlayer === 'O') {
          this.computerMove();
        }
      }
    }
  },

  // 顯示重新開始按鈕
  showRestartButton() {
    const restartButton = document.querySelector('.restart-button');
    restartButton.style.display = 'block';
  },

  // 重新開始遊戲
  restartGame() {
    this.board = ['', '', '', '', '', '', '', '', ''];
    this.currentPlayer = 'X';
    this.gameOver = false;
    this.render();
    const restartButton = document.querySelector('.restart-button');
    restartButton.style.display = 'none';
  },

  // 設置重新開始按鈕
  setupRestartButton() {
    const restartButton = document.querySelector('.restart-button');
    restartButton.addEventListener('click', () => this.restartGame());
  },

  // 渲染棋盤
  render() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
      cell.textContent = this.board[index];
    });
  },

  // 電腦AI下棋
  computerMove() {
    const bestMove = this.minimax(this.board, this.currentPlayer).index;
    this.board[bestMove] = this.currentPlayer;
    this.render();
    if (this.checkWinner()) {
      this.gameOver = true;
      alert(`${this.currentPlayer} wins!`);
      this.showRestartButton();
    } else if (this.board.every(cell => cell !== '')) {
      this.gameOver = true;
      alert('It\'s a draw!');
      this.showRestartButton();
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  },

  // 實現Minimax演算法
  minimax(board, player) {
    const checkWinner = () => {
      const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // 水平
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // 垂直
        [0, 4, 8], [2, 4, 6] // 對角
      ];
      for (const line of lines) {
        const [a, b, c] = line;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
          return board[a] === 'X' ? -1 : 1; // X獲勝返回-1，O獲勝返回1
        }
      }
      return 0; // 沒有玩家獲勝返回0
    };

    if (checkWinner() !== 0 || board.every(cell => cell !== '')) {
      return { score: checkWinner() };
    }

    const moves = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        const newBoard = [...board];
        newBoard[i] = player;
        const move = { index: i };
        const result = this.minimax(newBoard, player === 'X' ? 'O' : 'X');
        move.score = result.score;
        moves.push(move);
      }
    }

    let bestMove;
    if (player === this.currentPlayer) {
      let bestScore = -Infinity;
      moves.forEach(move => {
        if (move.score > bestScore) {
          bestScore = move.score;
          bestMove = move;
        }
      });
    } else {
      let bestScore = Infinity;
      moves.forEach(move => {
        if (move.score < bestScore) {
          bestScore = move.score;
          bestMove = move;
        }
      });
    }

    return bestMove;
  },

  // 檢查勝利條件
  checkWinner() {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // 水平
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // 垂直
      [0, 4, 8], [2, 4, 6] // 對角
    ];
    for (const line of lines) {
      const [a, b, c] = line;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        return true;
      }
    }
    return false;
  }
};

// 初始化遊戲
TicTacToeGame.init();
