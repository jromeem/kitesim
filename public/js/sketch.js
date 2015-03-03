var sketch = function(p) {

    var $doc = $(document);
    var $win = $(window);

    var id = Math.round($.now() * Math.random());
    var clients = {};   // fliers
    var cursors = {};   // their kites
    var lastEmit = $.now();

    var socket = io();
    var yourKite;
    var bg = p.loadImage("../img/zilker.jpg");

    document.body.style.cursor = 'none';

    // emit events when the docmument finds mouse movements
    $doc.on('mousemove',function(e){
        console.log('doc moging')
        if ($.now() - lastEmit > 30){
            socket.emit('mousemove',{
                'x': p.mouseX,
                'y': p.mouseY,
                'id': id
            });
            lastEmit = $.now();
        }
    });

    // kill clients after ten seconds of inactivity
    setInterval(function(){
        console.log('losing kite')
        for (ident in clients){
            if ($.now() - clients[ident].updated > 10000){
                // last update was more than 10 seconds ago: kill user
                cursors[ident].remove();
                delete clients[ident];
                delete cursors[ident];
            }
        }
    }, 10000);

    socket.on('moving', function (data) {
        console.log('movinegg here', data);
        // a new user has come online
        // create a cursor for them
        if (!(data.id in clients)) {
            console.log('adding new cursor', id);
            cursors[data.id] = new Kite(p.mouseX, p.mouseY);
        }

        // reassign this mouse data
        cursors[data.id].x = p.mouseX;
        cursors[data.id].y = p.mouseY

        clients[data.id] = data;
        clients[data.id].updated = $.now();
    });

    p.setup = function() {
        p.background(bg);

        yourKite = new Kite(p.mouseX, p.mouseY);
        p.createCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = function() {
        p.background(bg);
        yourKite.displaySelf();
        for (ident in clients) {
            console.log(cursors[ident])
            cursors[ident].display();
        }

    };

    // kite class
    function Kite(x, y) {
        this.x = x;
        this.y = y;
        this.diameter = 50;

        this.display = function() {
            p.ellipse(this.x, this.y, 50, 50);
        }

        this.displaySelf = function() {
            p.ellipse(p.mouseX, p.mouseY, 50, 50);
        }
    }
};