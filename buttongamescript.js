function start() {
    canvasStuff();
    animate();
};

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
function canvasStuff() {
	window.addEventListener('resize', resizeCanvas, false);
	function resizeCanvas() {
	  canvas.width = window.innerWidth/2;
      canvas.height = window.innerHeight/2;
      baseX = (innerWidth/2)-40;
	}
    resizeCanvas();
};

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);

    doStorageStuff();
   
    setButtonCountText();
    setDefenderCostText();
    timer();
    drawBase();
    drawEnemies();
    drawTowers();
    drawBullets();
};

var buttonCount = -1;
function setButtonCountText() {
    document.getElementById('buttonCount').innerHTML = buttonCount;
};

var check;
var lastCheckForButtons = 0;
var lastCheckForEnemies = 0;
var lastCheckForDefenderShoot = 0;
function timer() {
    if (check > (lastCheckForButtons + 1000)) {
        lastCheckForButtons = check;
        addButton();
    };
    if (check > (lastCheckForEnemies + 1200)) {
        lastCheckForEnemies = check;
        addStartingEnemy();
    };
    if (check > (lastCheckForDefenderShoot + 700)) {
        lastCheckForDefenderShoot = check;
        for (var i = 0; i < defenders.length; i++) {
            defenderShoot(defenders[i]);
        };
    };
    check = new Date().getTime();
};

function addButton() {
    buttonCount++;
};

var haveStored = false
function doStorageStuff() {
    if (haveStored) {storeCurrentData();}
    haveStored = true;
    if (toClear) {
        window.localStorage.clear();
        toClear= false;
    }
    setCurrentData();
}

function setCurrentData() {
    buttonCount = Number(window.localStorage.getItem('buttonCount'));
    defenders = JSON.parse(window.localStorage.getItem('defenders'));
    if (defenders == null) {
        defenders = [];
    };
};

function storeCurrentData() {
    window.localStorage.setItem('buttonCount',JSON.stringify(buttonCount));
    window.localStorage.setItem('defenders',JSON.stringify(defenders));
};

var toClear = false;
function clearButtonClicked() {
    toClear = true;
};

var baseX;
function drawBase() {
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.rect(baseX,0,40,innerHeight/2);
    ctx.lineWidth = '100';
    ctx.fill();
};

var startingEnemies = [];
function StartingEnemy(x,y,dx,dy,radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.exists = true;
    this.radius = radius;
};

function drawStartingEnemy(inputStartingEnemy) {
    inputStartingEnemy.y += inputStartingEnemy.dy;
    if (inputStartingEnemy.x > baseX) {
        inputStartingEnemy.exists = false;
    };
    if (inputStartingEnemy.y + inputStartingEnemy.radius > canvas.height || inputStartingEnemy.y - inputStartingEnemy.radius < 0) {
        inputStartingEnemy.dy *= -1;
    };
    
    ctx.beginPath();
    ctx.arc(inputStartingEnemy.x,inputStartingEnemy.y,inputStartingEnemy.radius,0,Math.PI * 2,false);
	ctx.fillStyle = 'red';
    ctx.fill();inputStartingEnemy.x += inputStartingEnemy.dx;
};

function drawEnemies() {
    for (var i=0; i < startingEnemies.length; i++) {
        drawStartingEnemy(startingEnemies[i]);
        if (!startingEnemies[i].exists) {
            startingEnemies.splice(i,1);
            startingEnemyHitBase();
        };
    };
};

function startingEnemyHitBase() {
    buttonCount -= 10;
};

function addStartingEnemy() {
    var x = -20;
    var radius = 10;
    var y = Math.round((Math.random()*(canvas.height - 2*radius) + radius));
    var dx = Math.random()+0.5;
    var dy = Math.random()*2 - 1;
    startingEnemies.push(new StartingEnemy(x,y,dx,dy,radius));
};

var mouseX;
var mouseY;
window.addEventListener('mousemove', function (event) {
	mouseX = event.x - innerWidth/4;
	mouseY = event.y - innerHeight/4;
});

function defenderPurchased() {
    if (buttonCount >= defenderCost) {
        defenders.push(new Defender(10,sliderDefenderBulletSpeed,sliderDefenderRange));
        buttonCount -= defenderCost;
    };
};

var sliderDefenderBulletSpeed;
var sliderDefenderRange;
var defenderCost;
function setDefenderCostText() {
    sliderDefenderBulletSpeed = document.getElementById('bulletSpeedSlider').value;
    sliderDefenderRange = document.getElementById('rangeSlider').value;
    defenderCost = Math.round(75 * (sliderDefenderBulletSpeed/3.5) * (sliderDefenderRange/125));
    document.getElementById('costOfDefender').innerHTML = defenderCost;
};

var defenders = [];
function Defender(radius,defenderBulletSpeed,range) {
    this.x;
    this.y;
    this.placed = false;
    this.radius = radius;
    this.defenderBulletSpeed = defenderBulletSpeed;
    this.range = range;
};

function drawDefender(inputDefender) {
    if (!inputDefender.placed) {
        inputDefender.x = mouseX;
        inputDefender.y = mouseY;
    };

    ctx.beginPath();
    ctx.arc(inputDefender.x,inputDefender.y,inputDefender.radius,0,Math.PI * 2,false);
	ctx.fillStyle = 'blue';
    ctx.fill();

    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(inputDefender.x,inputDefender.y,inputDefender.range,0,Math.PI * 2,false);
    ctx.strokeStyle = 'blue';
    ctx.stroke();
};

var defenderBullets = [];
var enemyToGoToX;
var enemyToGoToY;
function defenderShoot(inputDefender) {
    var distanceToShootEnemy = 0;
    for (var i = 0; i < startingEnemies.length; i++) {
        var thisEnemiesDistance = Math.sqrt(Math.pow((startingEnemies[i].x-inputDefender.x),2)+(Math.pow((startingEnemies[i].y-inputDefender.y),2)));
        if (thisEnemiesDistance <= inputDefender.range && thisEnemiesDistance > distanceToShootEnemy) {
            enemyToGoToX = startingEnemies[i].x;
            enemyToGoToY = startingEnemies[i].y;
        };
    };
    
    var bulletdx = inputDefender.defenderBulletSpeed * ((enemyToGoToX-inputDefender.x)/(Math.sqrt(Math.pow((enemyToGoToX-inputDefender.x),2)+(Math.pow((enemyToGoToY-inputDefender.y),2)))));
	var bulletdy = inputDefender.defenderBulletSpeed * ((enemyToGoToY-inputDefender.y)/(Math.sqrt(Math.pow((enemyToGoToX-inputDefender.x),2)+(Math.pow((enemyToGoToY-inputDefender.y),2)))));
    if (inputDefender.placed) {
        defenderBullets.push(new DefenderBullet(inputDefender.x,inputDefender.y,bulletdx,bulletdy,5,'blue'));
    };

    enemyToGoToX = NaN;
    enemyToGoToY = NaN;
};

window.addEventListener('mousedown', function () {
    for (var i=0; i < defenders.length; i++) {
        defenders[i].placed = true;
    };
});

function drawTowers() {
    for (var i=0; i < defenders.length; i++) {
        drawDefender(defenders[i]);
    };
}

function DefenderBullet(x,y,dx,dy,radius,color,) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;
    this.exists = true;
};

function drawDefenderBullet(inputDefenderBullet) {
	if (inputDefenderBullet.y + inputDefenderBullet.radius > canvas.height || inputDefenderBullet.y - inputDefenderBullet.radius < 0) {
		inputDefenderBullet.exists = false;
	};
	for (var i = 0; i < startingEnemies.length; i++) {
		if (Math.abs(startingEnemies[i].x - inputDefenderBullet.x) < startingEnemies[i].radius + inputDefenderBullet.radius && Math.abs(startingEnemies[i].y - inputDefenderBullet.y) < startingEnemies[i].radius + inputDefenderBullet.radius) {
             startingEnemies.splice(i,1);
             killedStartingEnemy();
		};
	};
	
	inputDefenderBullet.x += inputDefenderBullet.dx;
    inputDefenderBullet.y += inputDefenderBullet.dy;
     
    ctx.beginPath();
	ctx.arc(inputDefenderBullet.x,inputDefenderBullet.y,inputDefenderBullet.radius,0,Math.PI * 2,false);
    ctx.fillStyle = inputDefenderBullet.color;
    ctx.fill();
};

function drawBullets() {
    for (var i=0; i < defenderBullets.length; i++) {
        drawDefenderBullet(defenderBullets[i]);
        if (!defenderBullets[i].exists) {
            defenderBullets.splice(i,1);
        };
    };
}

function killedStartingEnemy() {
    buttonCount += 10;
};