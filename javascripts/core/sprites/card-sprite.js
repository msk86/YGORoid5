ROID5.CardSprite = (function(CoreSprite) {
    function CardSprite(game, x, y, card) {
        CoreSprite.call(this, game, x, y, card.id);
        this._card = card;
        this.anchor.setTo(0.5);
        this.tWidth = 49;
        this.tHeight = 70;
    }

    CardSprite.prototype = Object.create(CoreSprite.prototype);
    CardSprite.prototype.constructor = CardSprite;
    CardSprite.prototype.update = function() {
        var card = this._card;
        if(this._prePositive != card.positive || this._preSet != card.set) {
            if(card.positive) {
                this.angle = 0;
            } else {
                this.angle = 90;
            }
            if(card.set) {
                this.changeTexture('cover');
            } else {
                this.changeTexture(card.id);
            }

            this._prePositive = card.positive;
            this._preSet = card.set;
        }
    };

    return CardSprite;
})(ROID5.CoreSprite);
