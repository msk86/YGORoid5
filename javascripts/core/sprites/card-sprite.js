ROID5.CardSprite = (function(CoreSprite) {
    function CardSprite(game, x, y, card) {
        CoreSprite.call(this, game, x, y, card.id);
        this._card = card;
        this.anchor.setTo(0.5);
        this.tWidth = 49;
        this.tHeight = 70;

        this.textPos = {x: 0, y: 32};

        var textStyle = {font: '12px Arial', fill: '#FFFFFF', align: 'center'};
        this.atkDefText = new Phaser.Text(game, this.textPos.x, this.textPos.y, card.atk + '/' + card.def, textStyle);
        this.atkDefText.anchor.setTo(0.5);
    }

    CardSprite.prototype = Object.create(CoreSprite.prototype);
    CardSprite.prototype.constructor = CardSprite;
    CardSprite.prototype.update = function() {
        var card = this._card;
        if(this._prePositive != card.positive || this._preSet != card.set) {
            if(card.positive) {
                this.angle = 0;
                this.atkDefText.angle = 0;
                this.atkDefText.x = this.textPos.x;
                this.atkDefText.y = this.textPos.y;
            } else {
                this.angle = 90;
                this.atkDefText.angle = - 90;
                this.atkDefText.x = this.textPos.y;
                this.atkDefText.y = this.textPos.x;
            }
            if(card.set) {
                this.changeTexture('cover');
                this.removeChild(this.atkDefText);
            } else {
                this.changeTexture(card.id);
                this.addChild(this.atkDefText);
            }

            this._prePositive = card.positive;
            this._preSet = card.set;
        }
    };

    return CardSprite;
})(ROID5.CoreSprite);
