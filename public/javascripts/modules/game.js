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
