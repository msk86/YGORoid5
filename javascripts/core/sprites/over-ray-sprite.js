ROID5.OverRaySprite = (function (CoreSprite) {
    function OverRaySprite(game, x, y, overRay) {
        CoreSprite.call(this, game, x, y, null);
        this._overRay = overRay;
        this.anchor.setTo(0.5);
    }

    OverRaySprite.prototype = Object.create(CoreSprite.prototype);
    OverRaySprite.prototype.constructor = OverRaySprite;
    OverRaySprite.prototype.update = function () {
        this.attrNotifier('cards.length', function(size, overRay, sprite) {
            sprite.removeChildren();
            var cards = overRay.cards;
            for (var i = 0; i < cards.length - 1; i++) {
                var card = overRay.cards[i];
                var cardSprite = card.sprite();
                cardSprite.x = (cards.length - 1 - i) * 3;
                sprite.addChild(cardSprite);
                cardSprite.update();
            }
            var topCard = overRay.topCard();
            topCard.positive = overRay.positive;
            topCard.set = overRay.set;
            topCard.showDetail = true;
            var topSprite = topCard.sprite();
            sprite.addChild(topSprite);
            topSprite.update();
        });
        this.attrNotifier('positive', function(p, overRay, sprite) {
            var topCard = overRay.topCard();
            topCard.positive = p;
            var topSprite = topCard.sprite();
            topSprite.update();
        });
        this.attrNotifier('set', function(s, overRay, sprite) {
            var topCard = overRay.topCard();
            topCard.set = s;
            var topSprite = topCard.sprite();
            topSprite.update();
        });
    };

    return OverRaySprite;
})(ROID5.CoreSprite);
