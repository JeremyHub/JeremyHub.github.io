function start() {
    canvasstuff();
    animate();
};

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
function canvasstuff() {
	window.addEventListener('resize', resizeCanvas, false);
	function resizeCanvas() {
	  canvas.width = window.innerWidth;
	  canvas.height = window.innerHeight;
	}
    resizeCanvas();
};

function animate() {
	requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);
    
    drawButtonCountText();
    getButtons();
};

var buttonCount = -1;
var buttonCountText;
function drawButtonCountText() {
    buttonCountText = 'Buttons: ' + buttonCount;
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(buttonCountText, 10, 40);
};

var check;
var lastCheck;
function getButtons() {
    lastCheck = check;
    check = Math.round(new Date().getTime() / 1000);
    if (lastCheck != check) {
        buttonCount++;
    };
};