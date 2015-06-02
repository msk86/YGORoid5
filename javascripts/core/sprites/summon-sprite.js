ROID5.SummonSprite = (function(CoreSprite, Layout) {
    function SummonSprite(eff) {
        CoreSprite.call(this, eff, Layout.fieldWidth() / 2, Layout.fieldHeight() / 2 + Layout.EFFECT_SIZE.height / 2, null);
        this.anchor.setTo(0.5);

        createSummonCard(this, eff.card.id);

        tweenStart(this);

        function createSummonCard(summonEffect, texture) {
            var card = new CoreSprite(summonEffect.game, 0, 0, texture);
            card.anchor.setTo(0.5, 1);
            card.scaleTo(Layout.EFFECT_SIZE);
            card.height = 0;
            summonEffect.addChild(card);

            summonEffect._card = card;
        }


        function tweenStart(summonEffect) {
            var summon = summonEffect.game.add.tween(summonEffect._card).to({height: Layout.EFFECT_SIZE.height}, 150, Phaser.Easing.Linear.None, true);
            summon.onComplete.addOnce(function() {
                var fadeOut = summonEffect.game.add.tween(summonEffect._card).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true, 250);
                fadeOut.onComplete.addOnce(function() {
                    summonEffect.destroy();
                });
            });
        }
    }

    SummonSprite.prototype = Object.create(CoreSprite.prototype);
    SummonSprite.prototype.constructor = SummonSprite;

    return SummonSprite;
})(ROID5.CoreSprite, ROID5.Layout);
