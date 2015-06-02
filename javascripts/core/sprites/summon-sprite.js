ROID5.SummonSprite = (function(CoreSprite, Layout) {
    function SummonSprite(game, texture) {
        CoreSprite.call(this, game, Layout.fieldWidth() / 2, Layout.fieldHeight() / 2 + Layout.EFFECT_SIZE.height / 2, null);
        this.anchor.setTo(0.5);

        createEffectCard(this, texture);

        tweenStart(this);

        function createEffectCard(effect, texture) {
            var card = new CoreSprite(game, 0, 0, texture);
            card.anchor.setTo(0.5, 1);
            card.scaleTo(Layout.EFFECT_SIZE);
            card.height = 0;
            effect.addChild(card);

            effect._card = card;
        }


        function tweenStart(effect) {
            var summon = effect.game.add.tween(effect._card).to({height: Layout.EFFECT_SIZE.height}, 150, Phaser.Easing.Linear.None, true);
            summon.onComplete.addOnce(function() {
                var fadeOut = effect.game.add.tween(effect._card).to({alpha: 0}, 100, Phaser.Easing.Linear.None, true, 250);
                fadeOut.onComplete.addOnce(function() {
                    effect.destroy();
                });
            });
        }
    }

    SummonSprite.prototype = Object.create(CoreSprite.prototype);
    SummonSprite.prototype.constructor = SummonSprite;

    return SummonSprite;
})(ROID5.CoreSprite, ROID5.Layout);
