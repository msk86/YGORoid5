window.ROID5 = window.ROID5 || {};

ROID5.Disk = (function() {

    function create(game) {
        var disk = game.add.graphics(0, ROID5.Layout.diskHeight() + 64);

        disk.beginFill(0xFFFFFF, 0.5);


        console.log(ROID5.Layout.diskWidth());
        console.log(ROID5.Layout.diskHeight());
        disk.drawRect(0, 0, ROID5.Layout.diskWidth(), ROID5.Layout.diskHeight());

        for(var i=0;i<1;i++) {
            var zone = createZone('Graveyard', i, game);
            disk.addChild(zone);
        }

        return disk;
    }

    function createZone(z, index, game) {
        var x = ROID5.Layout.xOf(z, index);
        var y = ROID5.Layout.yOf(z, index);
        var w = ROID5.Layout.widthOf(z, index);
        var h = ROID5.Layout.heightOf(z, index);

        var zone = new Phaser.Graphics(game, x, y);
        zone.beginFill(0xFFFFFF, 0.5);
        zone.drawRect(x, y, w, h);

        return zone;
    }

    function createMonsterZone(game) {

    }


    return {
        create: create
    }
})();
