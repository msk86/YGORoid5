window.ROID5 = window.ROID5 || {};

ROID5.Card = (function(Core, CardSprite) {

    function Card(game, id) {
        Core.call(this, game);
        this.id = id;

        this.atk = 2500;
        this.def = 2000;

        this.set = false;
        this.positive = true;

        this.showDetail = true;
    }

    Card.prototype = Object.create(Core.prototype);
    Card.prototype.constructor = Card;

    Card.prototype.newSprite = function() {
        return new CardSprite(this.game, this.x, this.y, this);
    };

    return Card;
})(ROID5.Core, ROID5.CardSprite);
