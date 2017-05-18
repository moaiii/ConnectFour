/**
 * Coin Class
 */

ConnectFour.Coin = function(id, domElement) {

    /** Constructor */
    this.id = id;
    this.element = domElement;
    this.owner = undefined;
};

ConnectFour.Coin.prototype.getOwner = function() {
    return this.owner
};

ConnectFour.Coin.prototype.setOwner = function(ownerInput) {
    this.owner = ownerInput;
};

ConnectFour.Coin.prototype.setColor = function() {
    if(this.owner) {
        this.element.classList.add('player1')
    } else {
        this.element.classList.add('player2')
    }
};