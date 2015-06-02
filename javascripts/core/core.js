ROID5.Core = (function(CoreSprite, Layout, Player) {

    function Core(game) {
        this.game = game;
        this.currentPlayer = Player.ME;
    }

    Core.prototype.sprite = function() {
        var self = this;
        function createSprite() {
            var sprite = self.newSprite();
            sprite._core = self;
            self._sprite = sprite;
            return sprite;
        }

        return this._sprite || createSprite();
    };

    // Override this function to create own sprite
    Core.prototype.newSprite = function() {
        return new CoreSprite(this.game, this.x, this.y, null);
    };

    Core.prototype.addChild = function(coreObject) {
        this.sprite().addChild(coreObject.sprite());
    };

    Core.prototype.moveTo = function(x, y) {
        this.game.add.tween(this.sprite()).to({x: x, y: y}, 200, Phaser.Easing.Linear.None, true);
        this.setTo(x, y);
    };

    Core.prototype.setTo = function(x, y) {
        this.sprite().x = x;
        this.sprite().y = y;
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
                sprite.bringToTop();
                self.game.add.tween(sprite).to({x: x, y: y}, 200, Phaser.Easing.Linear.None, true);
            }
        }
    };

    return Core;
})(ROID5.CoreSprite, ROID5.Layout, ROID5.Player);
