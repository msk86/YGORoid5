ROID5.CardSprite = (function(CoreSprite) {
    function CardSprite(game, x, y, card) {
        CoreSprite.call(this, game, x, y, null);
        this._card = card;

        this.anchor.setTo(0.5);

        addCardImage(this);
        addAtkDefText(this);
    }

    function addAtkDefText(cardSprite) {
        cardSprite.showText = true;
        cardSprite.textPos = {x: 0, y: 32};
        var textStyle = {fontSize: 12, fill: '#FFFFFF', align: 'center'};
        cardSprite.atkDefText = new Phaser.Text(cardSprite.game, cardSprite.textPos.x, cardSprite.textPos.y, '', textStyle);
        cardSprite.atkDefText.anchor.setTo(0.5);
        cardSprite.addChild(cardSprite.atkDefText);
    }

    function addCardImage(cardSprite) {
        cardSprite.cardImage = new CoreSprite(cardSprite.game, 0, 0, cardSprite._card.id);
        cardSprite.cardImage.scaleTo(49, 70);
        cardSprite.cardImage.anchor.setTo(0.5);
        cardSprite.addChild(cardSprite.cardImage);
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
                this.cardImage.changeTexture('cover');
            } else {
                this.cardImage.changeTexture(card.id);
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
})(ROID5.CoreSprite);
