ROID5.EffectSprite = (function(CoreSprite, Layout) {
    function EffectSprite(game, texture) {
        CoreSprite.call(this, game, Layout.fieldWidth() / 2, Layout.fieldHeight() / 2, null);
        this.anchor.setTo(0.5);

        createEffectCard(this, texture);
        createEffectMask(this);
        createBlackMask(this);

        function createEffectCard(effect, texture) {
            var card = new CoreSprite(game, 0, 0, texture);
            card.anchor.setTo(0.5);
            card.scaleTo(Layout.EFFECT_SIZE);
            effect.addChild(card);
        }

        function createEffectMask(effect) {
            var mask = new CoreSprite(game, -Layout.EFFECT_SIZE.width, 0, 'effect');
            mask.anchor.setTo(0.5);
            mask.scaleTo(Layout.EFFECT_SIZE.height, Layout.EFFECT_SIZE.height);
            effect.addChild(mask);

            effect._tween = effect.game.add.tween(mask).to({x: Layout.EFFECT_SIZE.width}, 1000, Phaser.Easing.Linear.None, true);
        }

        function createBlackMask(effect) {
            var mask = new Phaser.Graphics(game, 0, 0);
            mask.beginFill(0xffffff);
            mask.drawRect(-Layout.EFFECT_SIZE.width / 2, -Layout.EFFECT_SIZE.height / 2, Layout.EFFECT_SIZE.width, Layout.EFFECT_SIZE.height);
            effect.addChild(mask);
            effect.mask = mask;
        }
    }

    EffectSprite.prototype = Object.create(CoreSprite.prototype);
    EffectSprite.prototype.constructor = EffectSprite;

    return EffectSprite;
})(ROID5.CoreSprite, ROID5.Layout);
