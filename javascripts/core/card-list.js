window.ROID5 = window.ROID5 || {};

ROID5.CardList = (function(Core, CardListSprite) {

    function CardList(game, name, size) {
        Core.call(this, game);
        this.name = name;
        this.size = size;

        this.set = false;
        this.topCard = null;
    }

    CardList.prototype = Object.create(Core.prototype);
    CardList.prototype.constructor = CardList;

    CardList.prototype.newSprite = function() {
        return new CardListSprite(this);
    };

    CardList.prototype.update = function(size, isSet, topCard) {
        this.size = size;
        this.set = isSet;
        this.topCard = topCard;
    };

    return CardList;
})(ROID5.Core, ROID5.CardListSprite);
