ROID5.Core = (function(CoreSprite, Layout, Player) {

    function Core(game) {
        this.game = game;
        this.currentPlayer = Player.ME;
        this.coreFlag = true;
        this._maxZ = 0;
    }

    Core.prototype.sprite = function() {
        var self = this;
        function createSprite() {
            self._sprite = self.newSprite();
            return self._sprite;
        }

        return this._sprite || createSprite();
    };

    // Override this function to create own sprite
    Core.prototype.newSprite = function() {
        return new CoreSprite(this, this.x, this.y, null);
    };

    Core.prototype.addChild = function(coreObject) {
        this.sprite().addChild(coreObject.sprite());
    };

    Core.prototype.putTo = function(player, zone, index) {
        index = index || 0;
        var self = this;
        var z = Layout.zoneDetail(player, zone, index);
        var sprite = this.sprite();
        var x = z.center.x, y = z.center.y;

        this.currentPlayer = player;

        return {
            set: function() {
                sprite.x = x;
                sprite.y = y;
            },
            move: function() {
                var sprite = self.sprite();
                sprite.z = ++ self._maxZ;
                self.game.add.tween(sprite).to({x: x, y: y}, 200, Phaser.Easing.Linear.None, true);
            }
        }
    };

    return Core;
})(ROID5.CoreSprite, ROID5.Layout, ROID5.Player);
