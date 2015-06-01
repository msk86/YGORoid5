window.ROID5 = window.ROID5 || {};

window.ROID5.Gesture = (function(Hammer, Layout) {
    var el = document.getElementById('ygo-roid-5');
    var mc = new Hammer.Manager(el);
    mc.add(new Hammer.Tap({event: 'doubletap', taps: 2}));
    mc.add(new Hammer.Press());
    mc.add(new Hammer.Pan());
    mc.add(new Hammer.Swipe({velocity: 0.1, direction: Hammer.DIRECTION_ALL})).recognizeWith(mc.get('pan'));

    var Event = {
        eventCbs: {},
        container: null,
        spriteContainer: function(container) {
            this.container = container;
        },
        fire: function(event, p1, p2, p3, p4) {
            this.eventCbs[event] = this.eventCbs[event] || [];
            this.eventCbs[event].forEach(function(cb) {
                cb(p1, p2, p3, p4);
            });
        },
        on: function(event, cb) {
            this.eventCbs[event] = this.eventCbs[event] || [];
            this.eventCbs[event].push(cb);
        }
    };

    function zone(point) {
        return Layout.zoneAt(point.x - Layout.FIELD_X, point.y - Layout.FIELD_Y);
    }

    function core(container, point) {
        var children = container.children || [];
        var sprites = children.filter(function(c) {
            return c._core;
        });
        var coreSprite = sprites.filter(function(c) {
            var bounds = c.getBounds();
            var px = point.x;
            var py = point.y;
            return bounds.left <= px && px < bounds.right &&
                bounds.top <= py && py < bounds.bottom;
        })[0];

        if(coreSprite) {
            return coreSprite._core;
        }
    }

    mc.on('doubletap', function(ev) {
        var point = ev.center;
        Event.fire('doubletap', zone(point), core(Event.container, point), point);
    });

    mc.on('press', function(ev) {
        console.log('press at: ', ev.center.x, ev.center.y, ev);
    });

    mc.on('pressup', function(ev) {
        console.log('pressup at: ', ev.center.x, ev.center.y, ev);
    });

    mc.on('swipeleft', function(ev) {
        var center = {x: ev.center.x + ev.distance / 2, y: ev.center.y};
        console.log('swipe h:', center);
    });

    mc.on('swiperight', function(ev) {
        var center = {x: ev.center.x - ev.distance / 2, y: ev.center.y};
        console.log('swipe h:', center);
    });

    mc.on('swipeup', function(ev) {
        var center = {x: ev.center.x, y: ev.center.y + ev.distance / 2};
        console.log('swipe v:', center);
    });
    mc.on('swipedown', function(ev) {
        var center = {x: ev.center.x, y: ev.center.y - ev.distance / 2};
        console.log('swipe v:', center);
    });

    mc.on('panstart', function(ev) {
        console.log('panstart at: ', ev.center.x, ev.center.y, ev);
    });

    mc.on('panmove', function(ev) {
        console.log('panmove at: ', ev.center.x, ev.center.y, ev);
    });

    mc.on('panend', function(ev) {
        console.log('panend at: ', ev.center.x, ev.center.y, ev);
    });


    return Event;
})(window.Hammer, ROID5.Layout, ROID5.CoreSprite);
