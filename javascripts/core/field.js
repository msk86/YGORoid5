window.ROID5 = window.ROID5 || {};

// Battle field for 2 players
ROID5.Field = (function(Disk, Layout) {

    function Field() {
        this.x = 0;
        this.y = 320 - Layout.diskHeight();
        this.width = Layout.diskWidth();
        this.height = Layout.diskHeight() * 2;
    }

    Field.prototype.sprite = function(game) {
        var self = this;
        function createSprite() {
            var field = new Phaser.Sprite(game, self.x, self.y, 'field');
            field.coreObj = self;
            self._sprite = field;

            return field;
        }

        return this._sprite || createSprite();
    };

    return Field;
})(ROID5.Disk, ROID5.Layout);
