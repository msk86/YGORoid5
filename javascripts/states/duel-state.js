var duelState = {
    preload: function() {
        var self = this;
        this.game.load.image('cover', '/assets/imgs/cover.jpg');
        loadCardImg('6928');
        loadCardImg('6484');
        loadCardImg('6867');
        function loadCardImg(id) {
            self.game.load.image(id, '/assets/imgs/cards/' + id +'.jpg');
        }
    },

    create: function() {
        var self = this;
        this.field = new ROID5.Field(this.game);
        this.game.add.existing(this.field.sprite());

        this.blink = new ROID5.Blink(this.game);
        this.field.addChild(this.blink);

        this.card = new ROID5.Card(this.game, '6928');
        this.card.set = false;
        this.card.positive = true;
        this.field.addChild(this.card);
        this.card.moveToField(0, "Monster", 1);
        setTimeout(function() {
            self.card.set = true;
            self.card.positive = false;
        }, 1000);

        this.overRay = new ROID5.OverRay(this.game);
        this.overRay.overRay(new ROID5.Card(this.game, '6928'));
        this.overRay.overRay(new ROID5.Card(this.game, '6928'));
        this.overRay.overRay(new ROID5.Card(this.game, '6867'));
        this.overRay.overRay(new ROID5.Card(this.game, '6484'));
        this.overRay.positive = true;
        this.overRay.set = false;

        this.field.addChild(this.overRay);
        this.overRay.moveToField(0, 'Monster', 3);

    },

    update: function() {
        // Function called 60 times per second
        var x = this.game.input.x, y = this.game.input.y;
        this.blink.moveTo(x, y);
    }
};
