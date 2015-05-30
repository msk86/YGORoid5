ROID5.CoreSprite = (function() {
    function CoreSprite(game, x, y, texture) {
        Phaser.Sprite.call(this, game, x, y, null);
        this.changeTexture(texture);
    }

    CoreSprite.prototype = Object.create(Phaser.Sprite.prototype);
    CoreSprite.prototype.constructor = CoreSprite;

    CoreSprite.prototype.changeTexture = function(texture, w, h) {
        if(this._texture != texture) {
            this.loadTexture(texture, 0);
            this._texture = texture;
        }

        var scale = scaleConfig(w, h);
        if(this._width != scale.width || this._height != scale.height) {
            this.scaleTo(scale.width, scale.height);
            this._width = scale.width;
            this._height = scale.height;
        }
    };

    CoreSprite.prototype.scaleTo = function(w, h) {
        if(this._texture && w && h) {
            this.scale.setTo(w / this.texture.width, h / this.texture.height);
        }
    };

    function scaleConfig(w, h) {
        var s = {};
        w = w || 0;
        h = h || 0;
        if(w && !h) {
            s.width = w.width;
            s.height = w.height;
        } else {
            s.width = w;
            s.height = h;
        }
        return s;
    }

    CoreSprite.prototype.update = function() {
        this.children.forEach(function(c) {
            c.update();
        });
    };

    CoreSprite.prototype.attrNotifier = function(attr, cb) {
        function attrValue(o, k) {
            if(o) {
                var v = o[k];
                if(typeof v == 'function') {
                    v = v.call(o);
                }
                return v;
            }
        }

        if(this._core) {
            var preAttrKey = ("_pre_" + attr);
            var previousValue = this[preAttrKey];

            var keys = attr.split('.');
            var obj = this._core;
            for(var i=0;i<keys.length;i++) {
                obj = attrValue(obj, keys[i]);
            }
            var currentValue = obj;

            if(typeof currentValue == 'function') {
                currentValue = currentValue.call(this._core);
            }

            if(previousValue != currentValue) {
                cb(currentValue, this._core, this);
            }

            this[preAttrKey] = currentValue;
        }
    };
    return CoreSprite;
})();
