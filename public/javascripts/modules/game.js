/**
 * Global game class
 */

var ConnectFour = {};

ConnectFour.App = function() {

    /** Game variables */
    this.player1 = false;
    this.isVsMachine = false;
    this.board = [];
    this.coins = [];
    this.DEBUG = true;

    /** Get game mode - Player vs Man / Machine? */
    this.setGameState_();
};

ConnectFour.App.prototype.setGameState_ = function() {
    var that = this;

    $('#button-man').on('click', function() {
        this.initGame_('man');  
    }.bind(this));

    $('#button-machine').on('click', function() {
        this.initGame_('machine');  
    }.bind(this));

    $('#button-replay').on('click', function() {
        this.refreshGame_();  
    }.bind(this));
};

ConnectFour.App.prototype.initGame_ = function(opponent) {
    if(opponent == 'machine') this.isVsMachine = true;

    var ROWS = 6;
    var COLUMNS = 7;
    this.initBoard_(ROWS, COLUMNS);
    this.showGameboard_();
};

ConnectFour.App.prototype.showGameboard_ = function() {
    $('.introduction').addClass('is-hidden');
    $('.gameboard, .instruction__title, .instruction').addClass('is-visable');
    $('.outline').addClass('is-active');
};

ConnectFour.App.prototype.showEndScene = function(winner) {
    var player = (winner) ? 'player 1' : 'player 2';
    $('.conclusion').addClass('is-active');
    $('.conclusion__winner').html(player);
};

ConnectFour.App.prototype.refreshGame_ = function(rows, columns) {
    location.reload();
};

ConnectFour.App.prototype.initBoard_ = function(rows, columns) {
    this.board = new ConnectFour.Board(rows, columns, this.coins);
};

window.onload = function() {
    ConnectFour.app = new ConnectFour.App();
};
