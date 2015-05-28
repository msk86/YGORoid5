window.ROID5 = window.ROID5 || {};

// Battle field for 2 players
ROID5.Blink = (function (Layout) {

    function Blink() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;

        this.zoneId = null;

        this._sprite = null;
    }

    Blink.prototype.moveTo = function (x, y) {
        var z = Layout.zoneAt(x - Layout.FIELD_X, y - Layout.FIELD_Y);
        if (z) {
            if (z.id != this.zoneId) {
                this.zoneId = z.id;
                this.x = z.x + Layout.FIELD_X;
                this.y = z.y + Layout.FIELD_Y;
                this.width = z.width;
                this.height = z.height;

                this._sprite.clear();
                this._sprite.beginFill(0xFF0000, 0.5);
                this._sprite.drawRect(this.x, this.y, this.width, this.height);

                this.start();
            }
        } else {
            this.zoneId = null;
            this.stop();
        }
    };

    Blink.prototype.start = function() {
        if(this._tween) {
            this._tween.resume();
        }
    };

    Blink.prototype.stop = function() {
        this._sprite.clear();
        if(this._tween) {
            this._tween.pause();
        }
    };

    Blink.prototype.sprite = function (game) {
        var self = this;

        function createSprite() {
            var blink = new Phaser.Graphics(game, 0, 0);
            blink.beginFill(0xFFFFFF, 0.5);
            blink.drawRect(0, 0, 0, 0);
            self._sprite = blink;
            blink.coreObj = self;

            self._tween = game.add.tween(blink).to({alpha: 0.2}, 800, Phaser.Easing.Linear.None, true, 0, -1, true);
            return blink;
        }

        return this._sprite || createSprite();
    };

    return Blink;
})(ROID5.Layout);