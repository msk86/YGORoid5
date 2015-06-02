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


    var pickedUp = null;
    var dragStart = null;

    mc.on('doubletap', function(ev) {
        var point = ev.center;
        Event.fire('effect', zone(point), core(Event.container, point), point);
    });

    mc.on('swipeleft', function(ev) {
        if(!pickedUp) {
            var point = {x: ev.center.x + ev.distance / 2, y: ev.center.y};
            Event.fire('rotate', zone(point), core(Event.container, point), point);
        }
    });

    mc.on('swiperight', function(ev) {
        if(!pickedUp) {
            var point = {x: ev.center.x - ev.distance / 2, y: ev.center.y};
            Event.fire('rotate', zone(point), core(Event.container, point), point);
        }
    });

    mc.on('swipeup', function(ev) {
        if(!pickedUp) {
            var point = {x: ev.center.x, y: ev.center.y + ev.distance / 2};
            Event.fire('flipsummon', zone(point), core(Event.container, point), point);
        }
    });

    mc.on('swipedown', function(ev) {
        if(!pickedUp) {
            var point = {x: ev.center.x, y: ev.center.y - ev.distance / 2};
            Event.fire('flip', zone(point), core(Event.container, point), point);
        }
    });

    mc.on('press', function(ev) {
        var point = ev.center;
        Event.fire('pickup', zone(point), core(Event.container, point), point);
        pickedUp = {
            zone: zone(point),
            core: core(Event.container, point),
            point: point
        };
    });

    mc.on('pressup', function(ev) {
        var point = ev.center;
        Event.fire('pickcancel', zone(point), core(Event.container, point), point);
        pickedUp = null;
    });

    mc.on('panstart', function(ev) {
        var point = ev.center;
        if(!pickedUp) {
            Event.fire('dragup', zone(point), core(Event.container, point), point);
            dragStart = {
                zone: zone(point),
                core: core(Event.container, point),
                point: point
            };
        }
    });

    mc.on('panmove', function(ev) {
        var point = ev.center;
        var event = pickedUp ? 'picking' : 'dragging';
        var move = pickedUp || dragStart || {};
        Event.fire(event, move.zone, move.core, point);
    });

    mc.on('panend', function(ev) {
        var point = ev.center;
        var event = pickedUp ? 'pickend' : 'dragend';
        var end = pickedUp || dragStart || {};
        Event.fire(event, zone(point), end.core, point, end);
        setTimeout(function() {
            pickedUp = null;
            dragStart = null;
        }, 50);

    });


    return Event;
})(window.Hammer, ROID5.Layout, ROID5.CoreSprite);
