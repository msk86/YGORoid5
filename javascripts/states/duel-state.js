var duelState = {
    preload: function() {
        this.game.load.image('6928', '/assets/imgs/cards/6928.jpg');
    },

    create: function() {
        var self = this;
        self.field = self.game.add.sprite(0, 64, 'field');
        self.field.scale.x = 2;
        self.field.scale.y = 2;


        self.zone = self.game.add.graphics(300, 200);
        self.zone.beginFill(0xFFFFFF, 0.5);
        self.zone.drawRect(0, 0, 50, 50);
        self.game.add.tween(self.zone).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true, 0, -1, true);

        var disk = ROID5.Disk.create(this.game);
    },

    update: function() {
        // Function called 60 times per second
    }
};
