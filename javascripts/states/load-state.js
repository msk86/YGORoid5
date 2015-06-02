var loadState = {
    preload: function() {
        this.game.stage.backgroundColor = 'gray';
        this.game.load.image('field', '/assets/imgs/field.png');
        this.game.load.image('effect', '/assets/imgs/effect.png');
    },

    create: function() {
        this.game.state.start('duel');
    }
};
