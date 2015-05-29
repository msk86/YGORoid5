window.ROID5 = window.ROID5 || {};

// Battle field for 2 players
ROID5.Field = (function(Core, CoreSprite, Layout) {

    function Field(game) {
        Core.call(this, game);

        this.x = 0;
        this.y = (640 - Layout.fieldHeight()) / 2;
        this.width = Layout.fieldWidth();
        this.height = Layout.fieldHeight();
    }

    Field.prototype = Object.create(Core.prototype);
    Field.prototype.constructor = Field;

    Field.prototype.newSprite = function() {
        return new CoreSprite(this.game, this.x, this.y, 'field');
    };

    return Field;
})(ROID5.Core, ROID5.CoreSprite, ROID5.Layout);
