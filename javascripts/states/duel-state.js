var duelState = {
    preload: function() {
        this.game.load.image('cover', '/assets/imgs/cover.jpg');
        this.game.load.image('6928', '/assets/imgs/cards/6928.jpg');
    },

    create: function() {
        this.field = new ROID5.Field();
        this.game.add.existing(this.field.sprite(this.game));

        this.blink = new ROID5.Blink();
        this.game.add.existing(this.blink.sprite(this.game));

        this.card = new ROID5.Card('6928');
        this.card.set = true;
        this.card.positive = false;
        this.game.add.existing(this.card.sprite(this.game));
        var zone = ROID5.Layout.zoneDetail(0, 'Monster', 2);
        this.card.moveTo(zone.center.x, zone.center.y);
    },

    update: function() {
        // Function called 60 times per second
        var x = this.game.input.x, y = this.game.input.y;
        this.blink.moveTo(x, y);
    }
};
