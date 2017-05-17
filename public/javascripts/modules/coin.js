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