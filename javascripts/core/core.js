ROID5.Core = (function(CoreSprite, Layout) {

    function Core(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.children = [];
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
        this.children.push(coreObject);
        this.sprite().addChild(coreObject.sprite());
    };

    Core.prototype.moveTo = function(x, y) {
        this.x = x;
        this.y = y;
        this.sprite().x = this.x;
        this.sprite().y = this.y;
    };

    Core.prototype.moveToField = function(player, zone, index) {
        var z = Layout.zoneDetail(player, zone, index);
        this.moveTo(z.center.x, z.center.y);
        if(z.player == 0) {
            this.sprite().baseAngle = 180;
        } else {
            this.sprite().baseAngle = 0;
        }
    };

    return Core;
})(ROID5.CoreSprite, ROID5.Layout);
