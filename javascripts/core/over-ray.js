window.ROID5 = window.ROID5 || {};

ROID5.OverRay = (function(Core, OverRaySprite) {

    function OverRay(game) {
        Core.call(this, game);
        this.cards = [];

        this.id = null;
        this.set = false;
        this.positive = true;
    }

    OverRay.prototype = Object.create(Core.prototype);
    OverRay.prototype.constructor = OverRay;

    OverRay.prototype.newSprite = function() {
        return new OverRaySprite(this);
    };

    OverRay.prototype.topCard = function() {
        return this.cards[this.cards.length - 1];
    };

    OverRay.prototype.overRay = function(card) {
        var topCard = this.topCard();
        if(topCard) {
            topCard.positive = true;
            topCard.set = false;
            topCard.showDetail = false;
        }
        this.cards.push(card);
        this.id = card.id;
    };

    return OverRay;
})(ROID5.Core, ROID5.OverRaySprite);
