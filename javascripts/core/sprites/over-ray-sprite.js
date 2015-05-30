ROID5.OverRaySprite = (function (CoreSprite) {
    function OverRaySprite(game, x, y, overRay) {
        CoreSprite.call(this, game, x, y, null);
        this._overRay = overRay;
        this.anchor.setTo(0.5);
    }

    OverRaySprite.prototype = Object.create(CoreSprite.prototype);
    OverRaySprite.prototype.constructor = OverRaySprite;
    OverRaySprite.prototype.update = function () {
        var cards = this._overRay.cards;
        if (cards.length) {
            var topCard = this._overRay.topCard();
            if (this._preCardsLength != cards.length || this._prePositive != topCard.positive || this._preSet != topCard.set) {
                if (this.children.length != cards.length) {
                    this.removeChildren();
                    for (var i = 0; i < cards.length - 1; i++) {
                        var card = cards[i];
                        var cardSprite = card.sprite();
                        cardSprite.showText = false;
                        cardSprite.x = (cards.length - 1 - i) * 3;
                        cardSprite.y = 0;
                        this.addChild(cardSprite);
                        cardSprite.update();
                    }
                }
                topCard.positive = this._overRay.positive;
                topCard.set = this._overRay.set;
                var topSprite = topCard.sprite();
                this.addChild(topSprite);
                topSprite.update();
            }

            this._preCardsLength = this._overRay.cards.length;
            this._prePositive = this._overRay.topCard().positive;
            this._preSet = this._overRay.topCard().set;
        }
    };

    return OverRaySprite;
})(ROID5.CoreSprite);
