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
            cardListSprite.nameText = new Phaser.Text(game, 0, -25, cardList.name, textStyle);
            cardListSprite.nameText.anchor.setTo(0.5);
            cardListSprite.nameText.setShadow(0, 0, '#000000', 5);
            cardListSprite.countText = new Phaser.Text(game, 0, 30, cardList.size, textStyle);
            cardListSprite.countText.anchor.setTo(0.5);
            cardListSprite.countText.setShadow(0, 0, '#000000', 5);

            cardListSprite.addChild(cardListSprite.nameText);
            cardListSprite.addChild(cardListSprite.countText);
        }
    }

    CardListSprite.prototype = Object.create(CoreSprite.prototype);
    CardListSprite.prototype.constructor = CardListSprite;
    CardListSprite.prototype.update = function () {
        if(this._cardList.size != this._preSize) {
            if(this._cardList.size) {
                if(this._cardList.set) {
                    this.cover.changeTexture('cover', Layout.CARD_SIZE);
                } else {
                    this.cover.changeTexture(this._cardList.topCard.id, Layout.CARD_SIZE);
                }
            } else {
                this.cover.changeTexture(null);
            }

            this.countText.setText(this._cardList.size);

            this._preSize = this._cardList.size;
        }
    };

    return CardListSprite;
})(ROID5.CoreSprite, ROID5.Layout);
