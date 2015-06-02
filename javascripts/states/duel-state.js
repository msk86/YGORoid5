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
        this.card.putTo(0, "Monster", 1).set();

        this.card2 = new ROID5.Card(this.game, '6867');
        this.card2.set = false;
        this.card2.positive = true;
        this.field.addChild(this.card2);
        this.card2.putTo(1, "Monster", 2).set();

        this.overRay = new ROID5.OverRay(this.game);
        this.overRay.overRay(new ROID5.Card(this.game, '6928'));
        this.overRay.overRay(new ROID5.Card(this.game, '6867'));
        this.overRay.overRay(new ROID5.Card(this.game, '6484'));
        this.overRay.positive = false;
        this.overRay.set = false;
        this.field.addChild(this.overRay);
        this.overRay.putTo(0, 'Monster', 3).set();


        this.grave = new ROID5.CardList(this.game, 'Grave', 20);
        this.grave.update(20, false, new ROID5.Card(this.game, '6867'));
        this.field.addChild(this.grave);
        this.grave.putTo(0, 'Graveyard').set();


        this.deck = new ROID5.Deck(this.game, 'Deck', 35);
        this.field.addChild(this.deck);
        this.deck.putTo(1, 'Deck').set();

        ROID5.Gesture.spriteContainer(this.field.sprite());

        ROID5.Gesture.on('doubletap', function(z,c,p) {
            console.log('doubletap', z, c, p);
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

        setTimeout(function() {
            self.field.addChild(new ROID5.Effect(self.game, '6867'));
        }, 500);
        setTimeout(function() {
            self.field.addChild(new ROID5.Effect(self.game, '6867', 'summon'));
        }, 1500);

        setTimeout(function() {
            self.card.putTo(0, "Monster", 4).move();
        }, 2500);

    },

    update: function() {
        // Function called 60 times per second
        var x = this.game.input.x, y = this.game.input.y;
        this.blink.moveTo(x, y);
    }
};
