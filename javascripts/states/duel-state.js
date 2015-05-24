var duelState = {
    preload: function() {
        this.game.load.image('6928', '/assets/imgs/cards/6928.jpg');
    },

    create: function() {
        this.field = new ROID5.Field();
        this.game.add.existing(this.field.sprite(this.game));

        this.blink = new ROID5.Blink(this.field.y);
        this.game.add.existing(this.blink.sprite(this.game));
    },

    update: function() {
        // Function called 60 times per second
        var x = this.game.input.x, y = this.game.input.y;
        this.blink.moveTo(x, y);
    }
};
