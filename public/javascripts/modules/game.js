/**
 *  game.js
 */

/*** Global object for app */
var ConnectFour = {};

/** 
 *  GAME CONSTRUCTOR
 */
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

/**
 *  Add event listeners to the introduction and 
 *  conclusion splash screen buttons to activate game states
 */
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

/**
 *  Initialise gameplay mode
 *  show the board in the dom
 *  @param {string} opponent
 */
ConnectFour.App.prototype.initGame_ = function(opponent) {
    /*** Global variable to check if opponent is automatic */
    if(opponent == 'machine') this.isVsMachine = true;

    var ROWS = 6;
    var COLUMNS = 7;
    this.initBoard_(ROWS, COLUMNS);
    this.showGameboard_();
};

/**
 *  Toggle visability of the game in the DOM UI
 */
ConnectFour.App.prototype.showGameboard_ = function() {
    $('.introduction').addClass('is-hidden');
    $('.gameboard, .instruction__title, .instruction').addClass('is-visable');
    $('.outline').addClass('is-active');
};

/**
 *  If a winner has been establised in board class
 *  call the end screen view
 *  @param {string} winner
 */
ConnectFour.App.prototype.showEndScene = function(winner) {
    var player = (winner) ? 'player 1' : 'player 2';
    $('.conclusion').addClass('is-active');
    $('.conclusion__winner').html(player);
};

/**
 *  reload page adn start game again
 */
ConnectFour.App.prototype.refreshGame_ = function() {
    location.reload();
};

/**
 *  create new instance of the board class
 *  @param {number} rows
 *  @param {number} columns
 */
ConnectFour.App.prototype.initBoard_ = function(rows, columns) {
    this.board = new ConnectFour.Board(rows, columns);
};

/**
 *  Instantiate new app object
 */
window.onload = function() {
    ConnectFour.app = new ConnectFour.App();
};
