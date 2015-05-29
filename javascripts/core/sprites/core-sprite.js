ROID5.CoreSprite = (function() {
    function CoreSprite(game, x, y, texture) {
        Phaser.Sprite.call(this, game, x, y, texture);
    }

    CoreSprite.prototype = Object.create(Phaser.Sprite.prototype);
    CoreSprite.prototype.constructor = CoreSprite;
    CoreSprite.prototype.update = function() {
        if(this._core) {
            this._core.children.forEach(function(c) {
                c.sprite().update();
            });
        }
    };
    return CoreSprite;
})();
