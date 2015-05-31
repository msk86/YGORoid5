ROID5.CardListSprite = (function (CoreSprite, Layout, Angle) {
    function CardListSprite(game, x, y, cardList) {
        CoreSprite.call(this, game, x, y, null);
        this._cardList = cardList;
        this.anchor.setTo(0.5);

        addCover(this);
        addListSide(this);
        addListText(this);

        function addCover(cardListSprite) {
            var coverTexture = cardListSprite._cardList.set ? 'cover' : cardListSprite._cardList.topCard.id;
            cardListSprite.cover = new CoreSprite(cardListSprite.game, 0, cardListSprite.listHeight(), coverTexture);
            cardListSprite.cover.anchor.setTo(0.5);
            cardListSprite.cover.scaleTo(Layout.CARD_SIZE);
            cardListSprite.addChild(cardListSprite.cover);
        }

        function addListSide(cardListSprite) {
            cardListSprite.side = new Phaser.Graphics(cardListSprite.game, -Layout.CARD_SIZE.width / 2, Layout.CARD_SIZE.height / 2);
            cardListSprite.drawListSide(cardListSprite.side);
            cardListSprite.addChild(cardListSprite.side);
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
                sprite.cover.y = sprite.listHeight();

                sprite.drawListSide(sprite.side);
            }
        });

        this.attrNotifier('set', function(s, cardList, sprite) {
            var texture = s ? 'cover' : cardList.topCard.id;
            sprite.cover.changeTexture(texture, Layout.CARD_SIZE);
        });

        this.attrNotifier('currentPlayer', function(p, cardList, sprite) {
            sprite.cover.angle = new Angle().player(p).value;
        });
    };

    CardListSprite.prototype.listHeight = function() {
        return -this._cardList.size / 8;
    };

    CardListSprite.prototype.drawListSide = function(graphic) {
        graphic.clear();
        graphic.beginFill(0x777777, 1);
        graphic.drawRect(0, 0, Layout.CARD_SIZE.width, this.listHeight());
    };

    return CardListSprite;
})(ROID5.CoreSprite, ROID5.Layout, ROID5.Helpers.Angle);
