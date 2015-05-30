window.ROID5 = window.ROID5 || {};

ROID5.CardList = (function(Core, CardListSprite) {

    function CardList(game, name, cards) {
        Core.call(this, game);
        this.name = name;
        this.cards = cards;

        this.set = false;
    }

    CardList.prototype = Object.create(Core.prototype);
    CardList.prototype.constructor = CardList;

    CardList.prototype.newSprite = function() {
        return new CardListSprite(this.game, this.x, this.y, this);
    };

    CardList.prototype.topCard = function() {
        return this.cards[0];
    };

    CardList.prototype.length = function() {
        return this.cards.length;
    };

    return CardList;
})(ROID5.Core, ROID5.CardListSprite);
