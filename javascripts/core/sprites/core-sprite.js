ROID5.CoreSprite = (function() {
    function CoreSprite(game, x, y, texture) {
        Phaser.Sprite.call(this, game, x, y, null);
        this.tWidth = 0;
        this.tHeight = 0;
        this.changeTexture(texture);
    }

    CoreSprite.prototype = Object.create(Phaser.Sprite.prototype);
    CoreSprite.prototype.constructor = CoreSprite;

    CoreSprite.prototype.changeTexture = function(texture) {
        if(this._texture == texture) {
            return;
        }
        this.loadTexture(texture, 0);
        this.rescale();
        this._texture = texture;
    };

    CoreSprite.prototype.rescale = function() {
        if(this._texture && this.tWidth && this.tHeight) {
            this.scale.setTo(this.tWidth / this.texture.width, this.tHeight / this.texture.height);
        }
    };

    CoreSprite.prototype.scaleTo = function(w, h) {
        this.tWidth = w;
        this.tHeight = h;
        if(this._texture && this.tWidth && this.tHeight) {
            this.scale.setTo(this.tWidth / this.texture.width, this.tHeight / this.texture.height);
        }
    };

    CoreSprite.prototype.update = function() {
        if(this._core) {
            this._core.children.forEach(function(c) {
                c.sprite().update();
            });
        }
    };
    return CoreSprite;
})();
