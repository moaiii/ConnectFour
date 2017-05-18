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