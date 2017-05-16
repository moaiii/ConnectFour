var ConnectFour = {};

ConnectFour.App = function() {
    this.initGame();
};

ConnectFour.App.prototype.initGame = function() {
    var row = new Array(3);
    this.board = new Array(row, row, row);
    
    console.log(this.board);
};

ConnectFour.App.prototype.resizeScreen = function() {};

ConnectFour.App.prototype.getAvailableSquares = function() {};

window.onload = function() {
    ConnectFour.app = new Moai.App();
};
ConnectFour.Machine = function() {};

ConnectFour.Machine.prototype.move = function() {};