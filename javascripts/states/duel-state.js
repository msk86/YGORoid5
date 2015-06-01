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
        this.card.positive = false;
        this.field.addChild(this.card);
        this.card.moveToField(0, "Monster", 1);

        this.card2 = new ROID5.Card(this.game, '6867');
        this.card2.set = false;
        this.card2.positive = true;
        this.field.addChild(this.card2);
        this.card2.moveToField(1, "Monster", 2);

        this.overRay = new ROID5.OverRay(this.game);
        this.overRay.overRay(new ROID5.Card(this.game, '6928'));
        this.overRay.overRay(new ROID5.Card(this.game, '6867'));
        this.overRay.overRay(new ROID5.Card(this.game, '6484'));
        this.overRay.positive = false;
        this.overRay.set = false;
        this.field.addChild(this.overRay);
        this.overRay.moveToField(0, 'Monster', 3);


        this.grave = new ROID5.CardList(this.game, 'Grave', 20);
        this.grave.update(20, false, new ROID5.Card(this.game, '6867'));
        this.field.addChild(this.grave);
        this.grave.moveToField(0, 'Graveyard', 0);


        this.deck = new ROID5.Deck(this.game, 'Deck', 35);
        this.field.addChild(this.deck);
        this.deck.moveToField(1, 'Deck', 0);

        ROID5.Gesture.spriteContainer(this.field.sprite());

        ROID5.Gesture.on('doubletap', function(z,c,p) {
            console.log('doubletap', z, c, p);
        });
        ROID5.Gesture.on('press', function(z,c,p) {
            console.log('press', z, c, p);
        });
        ROID5.Gesture.on('flip', function(z,c,p) {
            console.log('flip', z, c, p);
        });
        ROID5.Gesture.on('rotate', function(z,c,p) {
            console.log('rotate', z, c, p);
        });
        ROID5.Gesture.on('pickup', function(z,c,p) {
            console.log('pickup', z, c, p);
        });
        ROID5.Gesture.on('pickcancel', function(z,c,p) {
            console.log('pickcancel', z, c, p);
        });
        ROID5.Gesture.on('pickend', function(z,c,p) {
            console.log('pickend', z, c, p);
        });
    },

    update: function() {
        // Function called 60 times per second
        var x = this.game.input.x, y = this.game.input.y;
        this.blink.moveTo(x, y);
    }
};
