ROID5.CardListSprite = (function (CoreSprite) {
    function CardListSprite(game, x, y, cardList) {
        CoreSprite.call(this, game, x, y, null);
        this.cardList = cardList;
        this.anchor.setTo(0.5);
        this.tWidth = 49;
        this.tHeight = 70;

        var textStyle = {font: '12px Arial', fill: '#FFFFFF', align: 'center'};
        this.nameText = new Phaser.Text(game, 0, -25, cardList.name, textStyle);
        this.nameText.anchor.setTo(0.5);
        this.countText = new Phaser.Text(game, 0, 30, cardList.length(), textStyle);
        this.countText.anchor.setTo(0.5);

        this.addChild(this.nameText);
        this.addChild(this.countText);
    }

    CardListSprite.prototype = Object.create(CoreSprite.prototype);
    CardListSprite.prototype.constructor = CardListSprite;
    CardListSprite.prototype.update = function () {
        if(this.cardList.cards.length != this._preLength) {
            if(this.cardList.cards.length) {
                if(this.cardList.set) {
                    this.changeTexture('cover');
                } else {
                    this.changeTexture(this.cardList.topCard().id);
                }
            } else {
                this.changeTexture(null);
            }
            this.countText.setText(this.cardList.length());

            this._preLength = this.cardList.cards.length;
        }
    };

    return CardListSprite;
})(ROID5.CoreSprite);
