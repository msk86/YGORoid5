window.ROID5 = window.ROID5 || {};

ROID5.Card = (function() {

    function Card(cardId) {
        this.cardId = cardId;

        this.x = 100;
        this.y = 100;
        this.width = 50;
        this.height = 74;
    }

    Card.prototype.sprite = function(game) {
        var self = this;
        function createSprite() {
            var card = new Phaser.Sprite(game, self.x, self.y, self.cardId);
            card.anchor.set(0.5);
            card.inputEnabled = true;
            card.coreObj = self;
            self._sprite = card;

            return card;
        }

        return this._sprite || createSprite();
    };

    return Card;
})(ROID5.Layout);
