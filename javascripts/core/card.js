window.ROID5 = window.ROID5 || {};

ROID5.Card = (function(Layout) {

    function Card(game, id) {
        this.id = id;

        this.set = false;
        this.positive = true;

        this.game = game;
        this.x = -999;
        this.y = -999;
        this.width = 49;
        this.height = 70;
    }

    Card.prototype.sprite = function() {
        var self = this;
        function createSprite() {
            var card = new CardSprite(self.game, self.x, self.y, self);
            card.coreObj = self;
            self._sprite = card;

            return card;
        }

        return this._sprite || createSprite();
    };

    Card.prototype.moveTo = function(x, y) {
        this.x = x;
        this.y = y;
        this._sprite.x = this.x;
        this._sprite.y = this.y;
    };

    function CardSprite(game, x, y, card) {
        Phaser.Sprite.call(this, game, x, y, card.id);
        this.card = card;
        this.anchor.setTo(0.5);
    }

    CardSprite.prototype = Object.create(Phaser.Sprite.prototype);
    CardSprite.prototype.constructor = CardSprite;

    CardSprite.prototype.update = function() {
        if(this.card.positive) {
            this.angle = 0;
        } else {
            this.angle = 90;
        }
        if(this.card.set) {
            this.loadTexture('cover', 0);
        } else {
            this.loadTexture(this.card.id, 0);
        }
    };

    return Card;
})(ROID5.Layout);
