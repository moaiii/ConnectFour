/**
 * Global game object class
 */

var ConnectFour = {};

ConnectFour.App = function() {
    this.board = [];
    this.coins = [];
    this.initGame_();
    this.initBoard_();
};

ConnectFour.App.prototype.initGame_ = function() {};

ConnectFour.App.prototype.initBoard_ = function() {
    var rows = 6;
    for (var i = 0; i < rows; i++)
        this.board[i] = new Array(7);
    
    this.board[0][1] = 'coin';
    console.log(this.board);
};

ConnectFour.App.prototype.resizeScreen = function() {};

ConnectFour.App.prototype.getAvailableSquares = function() {};

window.onload = function() {
    ConnectFour.app = new ConnectFour.App();
};
/**
 * Machine Player Class
 */

ConnectFour.Machine = function() {};

ConnectFour.Machine.prototype.move = function() {};