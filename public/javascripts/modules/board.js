/**
 * Board class
 */

ConnectFour.Board = function(rows, columns) {
    this.squares = [];
    this.buildBoard_(rows, columns);
    this.attachEventListeners_();

};

ConnectFour.Board.prototype.buildBoard_ = function(rows, columns) {
    var row = '';
    var square = '';
    var gameboard = document.getElementsByClassName('gameboard')[0];

    for(var i = 0; i < rows; i++) {
        row = document.createElement('div');
        row.id = i;
        square.className = 'gameboard__row';

        for(var j = 0; j < columns; j++) {
            square = document.createElement('div');
            square.id = i + '-' + j;
            square.className = 'gameboard__square';
            row.appendChild(square);
            this.squares.push(square);
        }
        
        gameboard.appendChild(row);
    }
};

ConnectFour.Board.prototype.attachEventListeners_ = function() {
    this.squares.forEach(function(square){
        square.addEventListener();
    })
}

ConnectFour.Board.prototype.getAvailableSquares = function() {};