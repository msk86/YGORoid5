window.ROID5 = window.ROID5 || {};

ROID5.Effect = (function(Core, EffectSprite) {

    function Effect(game, id) {
        Core.call(this, game);
        this.id = id;
    }

    Effect.prototype = Object.create(Core.prototype);
    Effect.prototype.constructor = Effect;

    Effect.prototype.newSprite = function() {
        return new EffectSprite(this.game, this.id);
    };

    Effect.prototype.effect = function(cardId) {
        this.sprite();
    };

    return Effect;
})(ROID5.Core, ROID5.EffectSprite);
