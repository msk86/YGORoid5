ROID5.CardListSprite = (function (CoreSprite, Layout) {
    function CardListSprite(game, x, y, cardList) {
        CoreSprite.call(this, game, x, y, null);
        this._cardList = cardList;
        this.anchor.setTo(0.5);

        addCover(this);
        addListText(this);

        function addCover(cardListSprite) {
            var coverTexture = cardListSprite._cardList.set ? 'cover' : cardListSprite._cardList.topCard.id;
            cardListSprite.cover = new CoreSprite(cardListSprite.game, 0, 0, coverTexture);
            cardListSprite.cover.anchor.setTo(0.5);
            cardListSprite.cover.scaleTo(Layout.CARD_SIZE);
            cardListSprite.addChild(cardListSprite.cover);
        }

        function addListText(cardListSprite) {
            var textStyle = {fontSize: 12, fill: '#FFFFFF', align: 'center'};
            cardListSprite.countText = new Phaser.Text(game, 0, 40, cardList.size, textStyle);
            cardListSprite.countText.anchor.setTo(0.5);
            cardListSprite.countText.setShadow(0, 0, '#000000', 5);

            cardListSprite.addChild(cardListSprite.countText);
        }
    }

    CardListSprite.prototype = Object.create(CoreSprite.prototype);
    CardListSprite.prototype.constructor = CardListSprite;
    CardListSprite.prototype.update = function () {
        this.attrNotifier('size', function(size, cardList, sprite) {
            sprite.countText.setText(sprite._cardList.size);
            if(size == 0) {
                sprite.cover.changeTexture(null);
            } else {
                var texture = cardList.set ? 'cover' : cardList.topCard.id;
                sprite.cover.changeTexture(texture, Layout.CARD_SIZE);
            }
        });

        this.attrNotifier('set', function(s, cardList, sprite) {
            var texture = s ? 'cover' : cardList.topCard.id;
            sprite.cover.changeTexture(texture, Layout.CARD_SIZE);
        });
    };

    return CardListSprite;
})(ROID5.CoreSprite, ROID5.Layout);
