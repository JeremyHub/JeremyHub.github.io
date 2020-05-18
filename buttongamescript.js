function start() {
    canvasStuff();
    animate();
    setSliders();
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
    checkEnemyInBase()
    drawTowers();
    drawBullets();
    achievementCheck();
    upgradeUnlockCheck();
    upgradeCheck();
};

var buttonCount = -1;
function setButtonCountText() {
    document.getElementById('buttonCount').innerHTML = buttonCount;
};

var check;
var lastCheckForButtons = 0;
var lastCheckForEnemies = 0;
var lastCheckForDefenderShoot = 0;
var defaultTimeToEnemySpawn = 5000;
var timeToEnemySpawn = defaultTimeToEnemySpawn;
function timer() {
    if (check > (lastCheckForButtons + 1000)) {
        lastCheckForButtons = check;
        buttonCount++;
    };
    if (check > (lastCheckForEnemies + timeToEnemySpawn)) {
        lastCheckForEnemies = check;
        addStartingEnemy();
    };
    if (check > (lastCheckForDefenderShoot + 50)) {
        lastCheckForDefenderShoot = check;
        for (var i = 0; i < defenders.length; i++) {
            defenders[i].cooldown -= 0.05;
            if (defenders[i].cooldown <= 0){
                defenderShoot(defenders[i]);
            };
        };
    };
    check = new Date().getTime();
};

var haveStored = false
function doStorageStuff() {
    if (haveStored) {
        storeCurrentData();
    }
    haveStored = true;
    if (toClear) {
        window.localStorage.clear();
        toClear= false;
    };
    setCurrentData();
};

var Unlocks;
function setCurrentData() {
    buttonCount = Number(window.localStorage.getItem('buttonCount'));
    defenders = JSON.parse(window.localStorage.getItem('defenders'));
    Unlocks = JSON.parse(window.localStorage.getItem('unlocks'));
    if (defenders == null) {
        defenders = [];
    };
    if (Unlocks == null) {
        setUnlock();
    };
    timeToEnemySpawn = Number(window.localStorage.getItem('timeToEnemySpawn'));
    if (timeToEnemySpawn == 0) {
        timeToEnemySpawn = defaultTimeToEnemySpawn;
    };
};

function storeCurrentData() {
    window.localStorage.setItem('buttonCount',JSON.stringify(buttonCount));
    window.localStorage.setItem('defenders',JSON.stringify(defenders));
    window.localStorage.setItem('timeToEnemySpawn',JSON.stringify(timeToEnemySpawn));
    window.localStorage.setItem('unlocks',JSON.stringify(Unlocks));
};

var toClear = false;
function clearButtonClicked() {
    toClear = true;
    doStorageStuff();
    window.location.reload();
};

function setUnlock() {
    Unlocks = new Object();
        Unlocks.defenderUnlocked = false;
        Unlocks.defenderBulletSpeedUnlocked = false;
        Unlocks.defenderRangeUnlocked = false;
        Unlocks.defenderFireRateUnlocked = false;
        Unlocks.refreshed = false;
        Unlocks.startingEnemiesUnlocked = false;
        Unlocks.defenderPurchased = false;
        Unlocks.enemiesUpgradeUnlocked = false;
        Unlocks.defenderUpgradeUnlocked = false;
        Unlocks.enemyRampingUnlocked = false;
        Unlocks.enemyRampingUpgradeUnlocked = false;
};

var rangeSlider = {min:50,max:200,step:5,avg:125};
var bulletSpeedSlider = {min:1,max:6,step:0.1,avg:3.5};
var fireRateSlider = {min:0.5,max:6,step:0.05,avg:3.25};
function setSliders() {
    document.getElementById('rangeSlider').min = rangeSlider.min;
    document.getElementById('rangeSlider').max = rangeSlider.max;
    document.getElementById('rangeSlider').step = rangeSlider.step;
    document.getElementById('rangeSlider').value = rangeSlider.min;

    document.getElementById('bulletSpeedSlider').min = bulletSpeedSlider.min;
    document.getElementById('bulletSpeedSlider').max = bulletSpeedSlider.max;
    document.getElementById('bulletSpeedSlider').step = bulletSpeedSlider.step;
    document.getElementById('bulletSpeedSlider').value = bulletSpeedSlider.min;

    document.getElementById('fireRateSlider').min = fireRateSlider.min;
    document.getElementById('fireRateSlider').max = fireRateSlider.max;
    document.getElementById('fireRateSlider').step = fireRateSlider.step;
    document.getElementById('fireRateSlider').value = fireRateSlider.min;
}

var baseX;
function drawBase() {
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.rect(baseX,0,40,innerHeight/2);
    ctx.lineWidth = '100';
    ctx.fill();
};

var enemies = [];
function StartingEnemy(x,y,dx,dy,radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.inBase = false;
    this.radius = radius;
    this.type = 'startingEnemy';
};

function drawStartingEnemy(inputStartingEnemy) {
    inputStartingEnemy.y += inputStartingEnemy.dy;
    if (inputStartingEnemy.x > baseX) {
        inputStartingEnemy.inBase = true;
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
    for (var i=0; i < enemies.length; i++) {
        drawStartingEnemy(enemies[i]);
    };
};

function checkEnemyInBase() {
    for (var i=0; i < enemies.length; i++) {
        if (enemies[i].inBase) {
            enemyHitBase(enemies[i]);
            enemies.splice(i,1);
        };
    };
}

function enemyHitBase(enemyInput) {
    if (enemyInput.type == 'startingEnemy') {
        buttonCount -= 10;
        if (Unlocks.enemyRampingUnlocked) {
            timeToEnemySpawn *= 1.1;
        };
    };
};

function addStartingEnemy() {
    if (Unlocks.startingEnemiesUnlocked) {
        var x = -20;
        var radius = 10;
        var y = Math.round((Math.random()*(canvas.height - 2*radius) + radius));
        var dx = Math.random()+0.5;
        var dy = Math.random()*2 - 1;
        enemies.push(new StartingEnemy(x,y,dx,dy,radius));
    };
};

var mouseX;
var mouseY;
var mouseInCanvas = false;
window.addEventListener('mousemove', function (event) {
	mouseX = event.x - innerWidth/4;
    mouseY = event.y - innerHeight/4;
    if (mouseX > 0 && mouseX < canvas.width && mouseY > 0 && mouseY < canvas.height) {
        mouseInCanvas = true;
    }
    else {
        mouseInCanvas = false;
    };
});

function defenderPurchased() {
    if (buttonCount >= defenderCost) {
        defenders.push(new Defender(10,sliderDefenderBulletSpeedValue,sliderDefenderRangeValue,sliderFireRateValue));
        buttonCount -= defenderCost;
        if (Unlocks.defenderPurchased == false) {
            Unlocks.defenderPurchased = true;
            addAchievement("Achievement Get: Purchase a Defender!");
        }
    };
};

var sliderDefenderBulletSpeedValue;
var sliderDefenderRangeValue;
var sliderFireRateValue;
var defenderCost;
function setDefenderCostText() {
    sliderDefenderBulletSpeedValue = document.getElementById('bulletSpeedSlider').value;
    sliderDefenderRangeValue = document.getElementById('rangeSlider').value;
    sliderFireRateValue = document.getElementById('fireRateSlider').value;
    defenderCost = Math.round(150 * (sliderDefenderBulletSpeedValue/(bulletSpeedSlider.avg)) * (sliderDefenderRangeValue/rangeSlider.avg/3) * ((sliderFireRateValue/fireRateSlider.avg)*100));
    document.getElementById('costOfDefender').innerHTML = defenderCost;
};

var defenders = [];
function Defender(radius,defenderBulletSpeed,range,fireRate) {
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    this.placed = false;
    this.radius = radius;
    this.defenderBulletSpeed = defenderBulletSpeed;
    this.range = range;
    this.fireRate = fireRate;
    this.cooldown = 0;
};

function drawDefender(inputDefender) {
    if (!inputDefender.placed && mouseInCanvas) {
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
    var distanceToShootEnemy = inputDefender.range;
    for (var i = 0; i < enemies.length; i++) {
        var thisEnemiesDistance = Math.sqrt(Math.pow((enemies[i].x-inputDefender.x),2)+(Math.pow((enemies[i].y-inputDefender.y),2)));
        if (thisEnemiesDistance < distanceToShootEnemy) {
            enemyToGoToX = enemies[i].x;
            enemyToGoToY = enemies[i].y;
        };
    };
    
    if(!isNaN(enemyToGoToX) & !isNaN(enemyToGoToY)) {
        inputDefender.cooldown = 1/inputDefender.fireRate;
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
        if (mouseInCanvas) {defenders[i].placed = true;};
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
        return;
	};
	for (var i = 0; i < enemies.length; i++) {
		if (Math.abs(enemies[i].x - inputDefenderBullet.x) < enemies[i].radius + inputDefenderBullet.radius && Math.abs(enemies[i].y - inputDefenderBullet.y) < enemies[i].radius + inputDefenderBullet.radius) {
            enemies.splice(i,1);
            killedStartingEnemy();
            inputDefenderBullet.exists = false;
            return;
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
};

function killedStartingEnemy() {
    buttonCount += 10;
    if (Unlocks.enemyRampingUnlocked) {
        timeToEnemySpawn /= 1.1;
    };
};

window.addEventListener("beforeunload", function(event) {
    buttonCount++;
    Unlocks.refreshed = true;
});

var refreshedAchievementShown = false;
function achievementCheck() {
    if (Unlocks.refreshed && !refreshedAchievementShown) {
        addAchievement('Achievement Get: Refresh the Page!');
        refreshedAchievementShown = true;
    };
};

function addAchievement(achievement) {
    var achievementList = document.createElement("LI");
    var achievement = document.createTextNode(achievement);
    achievementList.appendChild(achievement);
    document.getElementById("ul").appendChild(achievementList);
    achievementList.className = "list-group-item";
};

function addUpgrade(upgradeInput,onClickAction) {
    var upgradeList = document.createElement("button");
    var upgrade = document.createTextNode(upgradeInput);
    upgradeList.appendChild(upgrade);
    document.getElementById("upgradeList").appendChild(upgradeList);
    upgradeList.className = "list-group-item list-group-item-action";
    upgradeList.onclick = onClickAction;
};

function unlockDefender() {
    if (buttonCount >= 100) {
        Unlocks.defenderUnlocked = true;
        buttonCount -= 100;    
    };
};

function unlockStartingEnemies() {
    if (buttonCount >= 50) {
        Unlocks.startingEnemiesUnlocked = true;
        buttonCount -= 50;
    };
};

function enableEnemySpawnRamping() {
    if (buttonCount >= 500) {
        Unlocks.enemyRampingUnlocked = true;
        buttonCount -= 500;
    }
};

function upgradeUnlockCheck() {
    if (Unlocks.refreshed) {
        Unlocks.defenderUpgradeUnlocked = true;
    };
    if (defenders.length >= 1 && defenders[0].placed) {
        Unlocks.enemiesUpgradeUnlocked = true;
    };
    if (buttonCount >= 200) {
        Unlocks.enemyRampingUpgradeUnlocked = true;
    };
};

var defenderButtonEnabled = false;
var startingEnemiesUpgradeUnlocked = false;
var enemyRampingUpgradeUnlocked = false;
var defenderDisplayEnabled = false;
function upgradeCheck() {
    if (Unlocks.defenderUpgradeUnlocked && !defenderButtonEnabled) {
        addUpgrade('Unlock Defender: 100 Buttons',unlockDefender);
        defenderButtonEnabled = true;
    };
    if (Unlocks.defenderUnlocked && !defenderDisplayEnabled) {
        document.getElementById('defenderDisplay').style.visibility = 'visible';
        defenderDisplayEnabled = true;
    };
    if (Unlocks.enemiesUpgradeUnlocked && !startingEnemiesUpgradeUnlocked) {
        addUpgrade('Start Spawning Enemies: 50 Buttons',unlockStartingEnemies);
        startingEnemiesUpgradeUnlocked = true;
    };
    if (Unlocks.enemyRampingUpgradeUnlocked && !enemyRampingUpgradeUnlocked) {
        addUpgrade('Enable Enemy Spawn Ramping: 500 Buttons',enableEnemySpawnRamping);
        enemyRampingUpgradeUnlocked = true;
    };
};