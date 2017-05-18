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

/**
 *  Coin.js
 */

/** 
 *  COIN CONSTRUCTOR
 *  @param {integer} id
 *  @param {HTMLElement} domElement
 */
ConnectFour.Coin = function(id, domElement) {
    this.id = id;
    this.element = domElement;
    this.owner = null;
};

/** 
 *  owner name getter
 *  @return {boolean} this.owner
 */
ConnectFour.Coin.prototype.getOwner = function() {
    return this.owner
};

/** 
 *  owner name setter
 *  @param {boolean} ownerInput
 */
ConnectFour.Coin.prototype.setOwner = function(ownerInput) {
    this.owner = ownerInput;
};

/** 
 *  toggle between red and yellow dependant 
 *  on instance ownership value
 */
ConnectFour.Coin.prototype.setColor = function() {
    if(this.owner) {
        this.element.classList.add('player1')
    } else {
        this.element.classList.add('player2')
    }
};
/**
 *  Board.js
 */

/** 
 *  BOARD CONSTRUCTOR
 *  structure of the object: board >> columns >> coins
 *  @param {!integer} ROWS
 *  @param {!integer} COLUMNS
 */
ConnectFour.Board = function(ROWS, COLUMNS) {
    this.rows = ROWS;
    this.columns = COLUMNS;
    this.isPlayer1 = true;
    this.board = this.initBoard_(ROWS, COLUMNS);
    this.instruction = document.getElementsByClassName('instruction')[0];
    this.attachEventListeners_();
};

/**
 *  Build the board dynamically
 *  Add the dom element and associated informaion to object and store in
 *  this.board
 *  @param {!integer} ROWS
 *  @param {!integer} COLUMNS
 *  @return {object} board
 */
ConnectFour.Board.prototype.initBoard_ = function(ROWS, COLUMNS) {
    var board = {};
    board.columns = [];
    board.element = document.getElementsByClassName('gameboard')[0];

    for(var i = 0; i < COLUMNS; i++) { 
        /** Initialise a new column object */
        var  column = {};
        /*** Add dom element ref to object */
        column.element = document.createElement('div');
        column.element.id = i;
        column.element.className = 'gameboard__column';
        /*** Add custom attributes to column object */
        column.nextAvailable = ROWS - 1;
        column.coins = [];

        /** Add coin slots object to column object */
        for(var j = 0; j < ROWS; j++) {
            var square = document.createElement('div');
            square.className = 'gameboard__square';
            /*** create coin dom element */
            coin = document.createElement('div');
            /*** add coin data to element and class object */
            coin.id = j;
            coin.className = 'gameboard__coin';
            /*** Add the coin in the square grid div */
            square.appendChild(coin);
            /*** Initialise the coin class constructor */
            column.coins.push(new ConnectFour.Coin(j, coin));
            /*** Add the square to buid the column in dom */
            column.element.appendChild(square);
        }
        /*** Add column the board object */
        board.columns.push(column);
        /*** Add column to the dom */
        board.element.appendChild(column.element);
    }
    /*** return the global board object */
    return board;
};

/***
 *  Add event listeners to the columns
 */
ConnectFour.Board.prototype.attachEventListeners_ = function() {
    var scope = this;
    this.board.columns.forEach(function(column){
        $(column.element).on('click', function() {
            scope.addCoin_(this.id);

            /** If machine is selected as the opponent, 
             * wait and make random move after 1s */
            if(ConnectFour.app.isVsMachine) {
                setTimeout(function() {
                    scope.addCoin_(Math.floor((Math.random() * 7)))
                }, 1000);
            }
        });
    });
};

/**
 * Add a new coin
 * Cycles through the vertical array (column), adds a coin and updates
 * the next available slot pointer
 * @param {integer} columnId
 */
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

/**
 * Toggle the dom element text which shows the user whos turn it is
 */
ConnectFour.Board.prototype.updatePlayerInstruction_ = function() {
    if(this.isPlayer1){
        $(this.instruction).html('Player 1');
    } else {
        if(ConnectFour.app.isVsMachine) {
            $(this.instruction).html('Machine');
        } else {
            $(this.instruction).html('Player 2');
        }
    }
    $('.instruction__icon').toggleClass('player2');
};

/**
 * Gate to fire the functions which check for a winning state
 * broken up like this for readability
 */
ConnectFour.Board.prototype.checkWinner_ = function() {
    this.matchHorizontal_();
    this.matchVertical_();
};

/**
 * Iterate over the board in groups of four 
 * and looking for a matching set
 * if found, fire the winning sequence
 */
ConnectFour.Board.prototype.matchHorizontal_ = function() {
    for(var colInc = 0; colInc < 4; colInc++){
        for(var row = 0; row < 6; row++) {

            if( (this.board.columns[colInc+0].coins[row].owner ===
                 this.board.columns[colInc+1].coins[row].owner) &&

                (this.board.columns[colInc+0].coins[row].owner ===
                 this.board.columns[colInc+2].coins[row].owner) &&

                (this.board.columns[colInc+0].coins[row].owner ===
                 this.board.columns[colInc+3].coins[row].owner) && 

                 /*** Account for the initial null states of the coin */
                (this.board.columns[colInc+0].coins[row].owner !== null) &&
                (this.board.columns[colInc+1].coins[row].owner !== null) &&
                (this.board.columns[colInc+2].coins[row].owner !== null) &&
                (this.board.columns[colInc+3].coins[row].owner !== null)) {

                    ConnectFour.app.showEndScene(
                        this.board.columns[colInc+0].coins[row].owner);
            }
        }
    }
};

ConnectFour.Board.prototype.matchVertical_ = function() {
    for(var rowInc = 0; rowInc < 3; rowInc++){
        for(var cols = 0; cols < 7; cols++) {

            if( (this.board.columns[cols].coins[rowInc+0].owner ===
                 this.board.columns[cols].coins[rowInc+1].owner) &&

                (this.board.columns[cols].coins[rowInc+0].owner ===
                 this.board.columns[cols].coins[rowInc+2].owner) &&

                (this.board.columns[cols].coins[rowInc+0].owner ===
                 this.board.columns[cols].coins[rowInc+3].owner) && 

                /*** Account for the initial null states of the coin */
                (this.board.columns[cols].coins[rowInc+0].owner !== null) &&
                (this.board.columns[cols].coins[rowInc+1].owner !== null) &&
                (this.board.columns[cols].coins[rowInc+2].owner !== null) &&
                (this.board.columns[cols].coins[rowInc+3].owner !== null)) {

                    ConnectFour.app.showEndScene(
                            this.board.columns[cols].coins[rowInc+0].owner);
            }
        }
    }
};
