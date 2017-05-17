/**
 * Global game object class
 */

var ConnectFour = {};

ConnectFour.App = function() {
    this.initGame_();
    this.DEBUG = true;
};

ConnectFour.App.prototype.initGame_ = function() {
    var ROWS = 6;
    var COLUMNS = 7;

    this.board = [];
    this.coins = [];
    this.initBoard_(ROWS, COLUMNS);
    this.initCoins_(ROWS, COLUMNS);

    document.onmousemove = this.getMouseX;
    document.onclick = this.clickEvent;
};

ConnectFour.App.prototype.initBoard_ = function(rows, columns) {
    this.board = new ConnectFour.Board(rows, columns);
};

ConnectFour.App.prototype.initCoins_ = function(rows, columns) {
    for(var i = 0; i < (rows * columns); i++)
        this.coins.push(new ConnectFour.Coin(i));
};

ConnectFour.App.prototype.getMouseX = function(event) {
    return event.clientX;
};

ConnectFour.App.prototype.clickEvent = function(event) {
    console.log(event.clientX);
    return event.clientX;
}

ConnectFour.App.prototype.resizeScreen = function() {};

window.onload = function() {
    ConnectFour.app = new ConnectFour.App();
};

/**
 * Coin Class
 */

ConnectFour.Coin = function(id) {

    /**
     * Constructor
     */
    this.id = id;
    this.color = null;
    this.startX = null;
    this.radius = null;
    this.endY = null;
};

ConnectFour.Coin.prototype.move = function() {};
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
/**
 * Machine Player Class
 */

ConnectFour.Machine = function() {};

ConnectFour.Machine.prototype.move = function() {};