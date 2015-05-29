ROID5.CardSprite = (function(CoreSprite) {
    function CardSprite(game, x, y, card) {
        CoreSprite.call(this, game, x, y, card.id);
        this._card = card;
        this.anchor.setTo(0.5);
    }

    CardSprite.prototype = Object.create(CoreSprite.prototype);
    CardSprite.prototype.constructor = CardSprite;
    CardSprite.prototype.update = function() {
        if(this._card.positive) {
            this.angle = 0;
        } else {
            this.angle = 90;
        }
        if(this._card.set) {
            this.loadTexture('cover', 0);
        } else {
            this.loadTexture(this._card.id, 0);
        }
    };

    return CardSprite;
})(ROID5.CoreSprite);
