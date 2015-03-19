var canvasSize = 250,
    centre = canvasSize/2,
    radius = canvasSize*0.8/2,
    s = Snap('#svg'),
    path = "",
    circles = s.circle(centre, centre, radius),
    arc = s.path(path),    
    startY = centre-radius,
    runBtn = document.getElementById('run'),
    percDiv = document.getElementById('percent'),
    lapsed = document.getElementById('lapsed'),
    input = document.getElementById('input');

    circles.attr({
    	//stroke: "rgba(61,160,141, 0.1)",
    	stroke: "rgba(255, 255, 255, 0.1)",
        fill: "none",
    	strokeWidth: 3
    });

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
    Snap.animate(oldVal, endpoint,   function (val) {
        arc.remove();

        var d = val,
            dr = d-90;
            radians = Math.PI*(dr)/180,
            endx = centre + radius*Math.cos(radians),
            endy = centre + radius * Math.sin(radians),
            largeArc = d>180 ? 1 : 0;  
            path = "M"+centre+","+startY+" A"+radius+","+radius+" 0 "+largeArc+",1 "+endx+","+endy;
  
        arc = s.path(path);
        arc.attr({
          stroke: '#FFFFFF',
          fill: 'none',
          strokeWidth: 3
        });
        //percDiv.innerHTML =    Math.round(val/360*100) +'%';

    }, 2000, mina.easeinout);  
    oldVal = endpoint;
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