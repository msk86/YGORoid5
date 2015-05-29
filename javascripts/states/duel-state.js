var duelState = {
    preload: function() {
        this.game.load.image('cover', '/assets/imgs/cover.jpg');
        this.game.load.image('6928', '/assets/imgs/cards/6928.jpg');
    },

    create: function() {
        this.field = new ROID5.Field(this.game);
        this.game.add.existing(this.field.sprite());

        this.blink = new ROID5.Blink(this.game);
        this.field.addChild(this.blink);

        this.card = new ROID5.Card(this.game, '6928');
        this.card.set = false;
        this.card.positive = true;
        this.field.addChild(this.card);
        var zone = ROID5.Layout.zoneDetail(0, 'Monster', 2);
        this.card.moveTo(zone.center.x, zone.center.y);
    },

    update: function() {
        // Function called 60 times per second
        var x = this.game.input.x, y = this.game.input.y;
        this.blink.moveTo(x, y);
    }
};
