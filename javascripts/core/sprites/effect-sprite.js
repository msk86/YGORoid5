ROID5.EffectSprite = (function(CoreSprite, Layout) {
    function EffectSprite(game, texture) {
        CoreSprite.call(this, game, Layout.fieldWidth() / 2, Layout.fieldHeight() / 2, null);
        this.anchor.setTo(0.5);

        createEffectCard(this, texture);
        createEffectBlink(this);
        createBlackMask(this);

        tweenStart(this);

        function createEffectCard(effect, texture) {
            var card = new CoreSprite(game, 0, 0, texture);
            card.alpha = 0;
            card.anchor.setTo(0.5);
            card.scaleTo(Layout.EFFECT_SIZE);
            effect.addChild(card);

            effect._card = card;
        }

        function createEffectBlink(effect) {
            var _blink = new CoreSprite(game, -Layout.EFFECT_SIZE.width, 0, 'effect');
            _blink.anchor.setTo(0.5);
            _blink.scaleTo(Layout.EFFECT_SIZE.height, Layout.EFFECT_SIZE.height);
            effect.addChild(_blink);

            effect._blink = _blink;
        }

        function createBlackMask(effect) {
            var mask = new Phaser.Graphics(game, 0, 0);
            mask.beginFill(0xffffff);
            mask.drawRect(-Layout.EFFECT_SIZE.width / 2, -Layout.EFFECT_SIZE.height / 2, Layout.EFFECT_SIZE.width, Layout.EFFECT_SIZE.height);
            effect.addChild(mask);
            effect.mask = mask;
        }

        function tweenStart(effect) {
            var fadeIn = effect.game.add.tween(effect._card).to({alpha: 1}, 150, Phaser.Easing.Linear.None, true);
            fadeIn.onComplete.addOnce(function() {
                var flash = effect.game.add.tween(effect._blink).to({x: Layout.EFFECT_SIZE.width}, 800, Phaser.Easing.Linear.None, true);
                flash.onComplete.addOnce(function() {
                    var fadeOut = effect.game.add.tween(effect._card).to({alpha: 0}, 150, Phaser.Easing.Linear.None, true);
                    fadeOut.onComplete.addOnce(function() {
                        effect.destroy();
                    });
                });
            });
        }
    }

    EffectSprite.prototype = Object.create(CoreSprite.prototype);
    EffectSprite.prototype.constructor = EffectSprite;

    return EffectSprite;
})(ROID5.CoreSprite, ROID5.Layout);
