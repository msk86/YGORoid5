window.ROID5 = window.ROID5 || {};

ROID5.Deck = (function(CardList) {

    function Deck(game, name, size) {
        CardList.call(this, game);
        this.name = name;
        this.size = size;

        this.set = true;
        this.topCard = null;
    }

    Deck.prototype = Object.create(CardList.prototype);
    Deck.prototype.constructor = Deck;

    return Deck;
})(ROID5.CardList);
