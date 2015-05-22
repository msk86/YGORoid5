window.ROID5 = window.ROID5 || {};

(function() {
    var roidGame = new Phaser.Game(640, 640, Phaser.AUTO, 'ygo-roid-5');

    roidGame.state.add('load', loadState);
    roidGame.state.add('duel', duelState);

    roidGame.state.start('load');
})();

