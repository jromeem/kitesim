/* script.js */
(function() {

    ///////////////////////////
    // some canvas setup ugh //
    ///////////////////////////

    // i freakin hate hungarians :(
    var $doc = $(document),
        $win = $(window),
        $canvas = $('#park'),   // element
        context = $canvas[0].getContext('2d');

    // dynamic full screen
    window.addEventListener('resize', resizeCanvas, false);
        function resizeCanvas() {
            $canvas[0].width = window.innerWidth;
            $canvas[0].height = window.innerHeight;
            draw();
    } resizeCanvas();

    /////////////////
    // socket shit //
    /////////////////

    // shh listening 👀👂))
    var socket = io();

    // create unique id
    var id = Math.round($.now()*Math.random());
    var clients = {};   // fliers
    var cursors = {};   // their kites
    var lastEmit = $.now();
    
    // capture movement
    socket.on('moving', function (data) {

        // a new user has come online
        // create a cursor for them
        if (!(data.id in clients)) {
            cursors[data.id] = $('<div class="cursor">').appendTo('#cursors');
        }

        // move the mouse pointer
        cursors[data.id].css({
            'left': data.x,
            'top' : data.y
        });

        // saving the current client state
        clients[data.id] = data;
        clients[data.id].updated = $.now();
    });

    // capture current movements
    $doc.on('mousemove',function(e){
        if($.now() - lastEmit > 30){
            socket.emit('mousemove',{
                'x': e.pageX,
                'y': e.pageY,
                'id': id
            });
            lastEmit = $.now();
        }
    });

    // kill clients after ten seconds of inactivity
    setInterval(function(){
        for(ident in clients){
            if($.now() - clients[ident].updated > 10000){
                // last update was more than 10 seconds ago: kill user
                cursors[ident].remove();
                delete clients[ident];
                delete cursors[ident];
            }
        }
    },10000);

    // do all canvas drawing IN HERE
    function draw() {
        // are we drawing anything here?
    }

})();
