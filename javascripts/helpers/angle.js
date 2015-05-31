window.ROID5 = window.ROID5 || {};
ROID5.Helpers = ROID5.Helpers || {};

ROID5.Helpers.Angle = (function (Player) {
    function Angle() {
        this.value = 0;
    }

    Angle.prototype.player = function(player) {
        if (player < Player.RIVAL) player = Player.RIVAL;
        if (player > Player.ME) player = Player.ME;
        this.value += (1 - player) * 180;
        return this;
    };

    Angle.prototype.positive = function(positive) {
        this.value += (positive ? 0 : 90);
        return this;
    };

    return Angle;
})(ROID5.Player);
