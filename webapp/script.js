var canvasSize = 250,
    centre = 125,
    radius = 100,    
    startY = centre-radius,
    runBtn = document.getElementById('run'),
    percDiv = document.getElementById('percent'),
    lapsed = document.getElementById('lapsed');

    var svg = document.getElementById('svg');
    var arc = document.getElementById('arc');

 var lastSmoke = new Date(localStorage['lastSmoke']);

 if (isNaN(lastSmoke.getTime()))
 {
    lastSmoke = new Date();
 }

 var hour = 60 * 60;

 var ff = function()
 {
    var d = new Date();

    var seconds = Math.floor((d - lastSmoke) / 1000);

    run(seconds / hour);





    var h = Math.floor(seconds / 60 / 60);

    var m = Math.floor((seconds - h * 3600) / 60);

    var s = (seconds % 60);

    lapsed.innerHTML = h + 'h '+m+'m ' + s + 's';


    setTimeout(ff, 1000);
 }

 ff();


var oldVal = 0;
runBtn.onclick = function() {
   lastSmoke = new Date();
   localStorage['lastSmoke'] = lastSmoke;
};



function run(percent) {
    var endpoint = percent*360;

    if (endpoint > 359) endpoint = 359;

    //console.log(arc);

    var d = endpoint,
            dr = d-90;
            radians = Math.PI*(dr)/180,
            endx = centre + radius*Math.cos(radians),
            endy = centre + radius * Math.sin(radians),
            largeArc = d>180 ? 1 : 0;  
            path = "M"+centre+","+startY+" A"+radius+","+radius+" 0 "+largeArc+",1 "+endx+","+endy;

    arc.setAttribute('d', path);
}

run(0);

var scrollOld = 0;


  runBtn.addEventListener('touchmove', function(event) {
    var touch = event.targetTouches[0];
 
    // Place element where the finger is
    runBtn.style.left = touch.pageX-25 + 'px';
    runBtn.style.top = touch.pageY-25 + 'px';
    event.preventDefault();
  }, false);
/* */