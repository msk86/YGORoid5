var loadState = {
    preload: function() {
        this.game.stage.backgroundColor = 'gray';
        this.game.load.image('field', '/assets/imgs/field.png');
    },

    create: function() {
        this.game.state.start('duel');
    }
};
