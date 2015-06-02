window.ROID5 = window.ROID5 || {};

ROID5.Effect = (function(Core, EffectSprite, SummonSprite) {

    function Effect(game, id, type) {
        Core.call(this, game);
        this.type = type;
        this.id = id;
    }

    Effect.prototype = Object.create(Core.prototype);
    Effect.prototype.constructor = Effect;

    Effect.prototype.newSprite = function() {
        if(this.type == Effect.SUMMON) {
            return new SummonSprite(this.game, this.id);
        } else {
            return new EffectSprite(this.game, this.id);
        }

    };

    Effect.TYPE = {
        SUMMON : 'summon',
        EFFECT : 'effect'
    };

    return Effect;
})(ROID5.Core, ROID5.EffectSprite, ROID5.SummonSprite);
