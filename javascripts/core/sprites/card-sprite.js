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
        var card = this._card;
        if(this._prePositive != card.positive || this._preSet != card.set) {
            if(card.positive) {
                this.cardImage.angle = 0;
            } else {
                this.cardImage.angle = 90;
            }
            if(card.set) {
                this.cardImage.changeTexture('cover', Layout.CARD_SIZE);
            } else {
                this.cardImage.changeTexture(card.id, Layout.CARD_SIZE);
            }

            if(this.showText) {
                if(card.set) {
                    this.atkDefText.setText('');
                } else {
                    this.atkDefText.setText(card.atk + '/' + card.def);
                }
            }

            this._prePositive = card.positive;
            this._preSet = card.set;
        }
    };

    return CardSprite;
})(ROID5.CoreSprite, ROID5.Layout);
