/**
 * Board class
 */

ConnectFour.Board = function(ROWS, COLUMNS, coins) {
    /** Board object
     *  board >> columns >> coins
     */
    this.rows = ROWS;
    this.columns = COLUMNS;
    this.isPlayer1 = true;
    this.board = this.initBoard_(ROWS, COLUMNS);
    this.instruction = document.getElementsByClassName('instruction')[0];
    this.buildBoard_();
    this.attachEventListeners_();
    console.log(this.board);
};

ConnectFour.Board.prototype.initBoard_ = function(ROWS, COLUMNS) {
    var board = {};
    board.columns = [];
    board.element = document.getElementsByClassName('gameboard')[0];

    for(var i = 0; i < COLUMNS; i++) { 
        /** Initialise a new column object */
        var  column = {};
        column.element = document.createElement('div');
        column.element.id = i;
        column.element.className = 'gameboard__column';
        column.nextAvailable = ROWS - 1;
        column.coins = [];

        /** Add coin slots object to column object */
        for(var j = 0; j < ROWS; j++) {
            var square = document.createElement('div');
            square.className = 'gameboard__square';
            
            coin = document.createElement('div');
            coin.id = j;
            coin.className = 'gameboard__coin';
            square.appendChild(coin);
            column.coins.push(new ConnectFour.Coin(j, coin));
            
            column.element.appendChild(square);
        }
        
        board.columns.push(column);
        board.element.appendChild(column.element);
    }
    
    return board;
};

ConnectFour.Board.prototype.buildBoard_ = function() {};

ConnectFour.Board.prototype.attachEventListeners_ = function() {
    var scope = this;
    this.board.columns.forEach(function(column){
        $(column.element).on('click', function() {
            scope.addCoin_(this.id);
        });
    });
};

ConnectFour.Board.prototype.addCoin_ = function(columnId) {
    var coin = this.board.columns[columnId]
                .coins[this.board.columns[columnId]
                .nextAvailable];
    
    if(this.isPlayer1) {
        coin.setOwner(true);
    } else {
        coin.setOwner(false)
    }

    this.isPlayer1 = !this.isPlayer1;
    this.updatePlayerInstruction_();
    coin.setColor();
    --this.board.columns[columnId].nextAvailable;
    this.checkWinner_();
};

ConnectFour.Board.prototype.updatePlayerInstruction_ = function() {
    if(this.isPlayer1){
        $(this.instruction).html('Player 1');
    } else {
        $(this.instruction).html('Player 2');
    }

    $('.instruction__icon').toggleClass('player2');
};

ConnectFour.Board.prototype.checkWinner_ = function() {
    this.matchHorizontal_();
    this.matchVertical_();
};

ConnectFour.Board.prototype.matchHorizontal_ = function() {
    // TODO add another loop to shift the starting position of the check seq.
    for(var row = 0; row < 6; row++) {
        if( this.board.columns[0].coins[row].owner ===
            this.board.columns[1].coins[row].owner ===
            this.board.columns[2].coins[row].owner ===
            this.board.columns[3].coins[row].owner) {
                console.log('winner horizontal');
                console.log(
                    this.board.columns[0].coins[row].element,
                    this.board.columns[1].coins[row].element,
                    this.board.columns[2].coins[row].element,
                    this.board.columns[3].coins[row].element
                );
            } else {

            }
    }
};

ConnectFour.Board.prototype.matchVertical_ = function() {
    // TODO add another loop to shift the starting position of the check seq.
    for(var cols = 0; cols < 7; cols++) {
        if( this.board.columns[cols].coins[0].owner ===
            this.board.columns[cols].coins[1].owner ===
            this.board.columns[cols].coins[2].owner ===
            this.board.columns[cols].coins[3].owner) {
                console.log('winner vertical');
                console.log(
                    this.board.columns[cols].coins[0].element,
                    this.board.columns[cols].coins[1].element,
                    this.board.columns[cols].coins[2].element,
                    this.board.columns[cols].coins[3].element
                );
            } else {

            }
    }
};
