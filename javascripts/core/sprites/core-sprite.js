ROID5.CoreSprite = (function() {
    function CoreSprite(game, x, y, texture) {
        Phaser.Sprite.call(this, game, x, y, texture);
        this.tWidth = 0;
        this.tHeight = 0;
    }

    CoreSprite.prototype = Object.create(Phaser.Sprite.prototype);
    CoreSprite.prototype.constructor = CoreSprite;

    CoreSprite.prototype.changeTexture = function(texture) {
        this.loadTexture(texture, 0);
        if(texture && this.tWidth && this.tHeight) {
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
