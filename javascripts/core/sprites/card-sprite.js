ROID5.CardSprite = (function(CoreSprite, Layout) {
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
        cardSprite.showText = true;
        var textStyle = {fontSize: 12, fill: '#FFFFFF', align: 'center'};
        cardSprite.atkDefText = new Phaser.Text(cardSprite.game, 0, 32, '', textStyle);
        cardSprite.atkDefText.anchor.setTo(0.5);
        cardSprite.atkDefText.setShadow(0, 0, '#000000', 5);
        cardSprite.addChild(cardSprite.atkDefText);
    }

    CardSprite.prototype = Object.create(CoreSprite.prototype);
    CardSprite.prototype.constructor = CardSprite;
    CardSprite.prototype.update = function() {
        this.attrNotifier('positive', function(p, card, sprite) {
            if(p) {
                sprite.cardImage.angle = 0;
            } else {
                sprite.cardImage.angle = 90;
            }
        });

        this.attrNotifier('set', function(s, card, sprite) {
            if(s) {
                sprite.cardImage.changeTexture('cover', Layout.CARD_SIZE);
                sprite.atkDefText.setText('');
            } else {
                sprite.cardImage.changeTexture(card.id, Layout.CARD_SIZE);
                if(sprite.showText) {
                    sprite.atkDefText.setText(card.atk + '/' + card.def);
                }
            }
        });
    };

    return CardSprite;
})(ROID5.CoreSprite, ROID5.Layout);
