window.ROID5 = window.ROID5 || {};

// Battle field for 2 players
ROID5.Field = (function(Disk, Layout) {

    function Field(game) {
        this.children = [];
        this.game = game;
        this.x = 0;
        this.y = (640 - Layout.fieldHeight()) / 2;
        this.width = Layout.fieldWidth();
        this.height = Layout.fieldHeight();
    }

    Field.prototype.sprite = function() {
        var self = this;
        function createSprite() {
            var field = new Phaser.Sprite(self.game, self.x, self.y, 'field');
            field.coreObj = self;
            self._sprite = field;

            return field;
        }

        return this._sprite || createSprite();
    };

    Field.prototype.addChild = function(coreObject) {
        this.children.push(coreObject);
        this._sprite.addChild(coreObject.sprite());
    };

    return Field;
})(ROID5.Disk, ROID5.Layout);
