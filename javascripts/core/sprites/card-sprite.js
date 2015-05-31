ROID5.CardSprite = (function(CoreSprite, Layout, Angle) {
    function CardSprite(game, x, y, card) {
        CoreSprite.call(this, game, x, y, null);
        this._card = card;
        this.anchor.setTo(0.5);

        addCardImage(this);
        addAtkDefText(this);
    }

    function addCardImage(cardSprite) {
        cardSprite.cardImage = new CoreSprite(cardSprite.game, 0, 0, cardSprite._card.id);
        cardSprite.cardImage.anchor.setTo(0.5);
        cardSprite.cardImage.scaleTo(Layout.CARD_SIZE);
        cardSprite.addChild(cardSprite.cardImage);
    }

    function addAtkDefText(cardSprite) {
        var textStyle = {fontSize: 12, fill: '#FFFFFF', align: 'center'};
        cardSprite.atkDefText = new Phaser.Text(cardSprite.game, 0, cardSprite.atkDefTextY(), '', textStyle);
        cardSprite.atkDefText.anchor.setTo(0.5);
        cardSprite.atkDefText.setShadow(0, 0, '#000000', 5);
        cardSprite.addChild(cardSprite.atkDefText);
    }

    CardSprite.prototype = Object.create(CoreSprite.prototype);
    CardSprite.prototype.constructor = CardSprite;
    CardSprite.prototype.update = function() {
        this.attrNotifier('positive', function(p, card, sprite) {
            sprite.cardImage.angle = new Angle().positive(p).player(card.currentPlayer).value;
        });

        this.attrNotifier('set', function(s, card, sprite) {
            if(s) {
                sprite.cardImage.changeTexture('cover', Layout.CARD_SIZE);
                sprite.removeChild(sprite.atkDefText);
            } else {
                sprite.cardImage.changeTexture(card.id, Layout.CARD_SIZE);
                sprite.addChild(sprite.atkDefText);
            }
        });

        this.attrNotifier('showDetail', function(detail, card, sprite) {
            if(detail) {
                sprite.atkDefText.setText(card.atk + '/' + card.def);
            } else {
                sprite.atkDefText.setText('');
            }
        });

        this.attrNotifier('currentPlayer', function(p, card, sprite) {
            sprite.cardImage.angle = new Angle().positive(card.positive).player(p).value;
            sprite.atkDefText.y = sprite.atkDefTextY();
        });
    };

    CardSprite.prototype.atkDefTextY = function() {
        var card = this._core || this._card;
        return (card.currentPlayer * 2 - 1) * 27 + card.currentPlayer * 6;
    };
    return CardSprite;
})(ROID5.CoreSprite, ROID5.Layout, ROID5.Helpers.Angle);
