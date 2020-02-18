var currentask = 8;
var date = "mar 13 2020 21:00:00";
var defaultsign = 1;
var sign = defaultsign;
var titlemw = "to Spring Break";
var defaultdatenow = 1;
var datenow = defaultdatenow;
var deadline;
var now;
var howlongtill;
var years;
var months;
var weeks;
var days;
var hours;
var minutes;
var seconds;
var milisec;
var inputdateyear;
var inputdatemonth;
var inputdateday;
var inputdatetime;
var signinput;
var currentyear;
var monthofdatewanted;
var monthofdatenow;
var strofdatenow;
var strofdatewanted;
var timezoneoffset = 480;

function daysinmonth (monthfordays) {
	if (((currentyear % 4 == 0) && (currentyear % 100 != 0)) || (currentyear % 400 == 0)) {
		if (monthfordays == 2) {
			return new Date(currentyear, monthfordays, 0).getDate() + 1;
		}
		else {
			return new Date(currentyear, monthfordays, 0).getDate();
		}
	}
	else {
		return new Date(currentyear, monthfordays, 0).getDate();
	}
};

function getmonthnum(mon){
	var d = Date.parse(mon + "1, " + "6969");
	if(!isNaN(d)){
	   return new Date(d).getMonth() + 1;
	}
	else {return};
   }

function settask (val) {
	currentask = val;
	howlong();
};

function changedate (whichdate) {
	datenow = whichdate;
	switchdate(datenow);
	howlong();
};

function switchdate (datewanted) {	
	if (datewanted == 1) {
		date = "mar 13 2020 21:00:00";
		titlemw = "to Spring Break";
		sign = 1;
	}
	else if (datewanted == 2) {
		date = "jan 17 2019";
		sign = -1;
		titlemw = "Since First Date";
	}
	else if (datewanted == 3) {
		date = "may 12 2020";
		titlemw = "to Summer Break";
		sign = 1;
	}
	else if (datewanted == 4) {
		if (!isNaN((document.getElementById('customdateyear').value)) && (document.getElementById('customdateyear').value.length !== 0)) {
			date = custom();
			titlemw = document.getElementById('sign').value + " " + date;
			signinput = document.getElementById('sign').value;
			if (signinput == "to") {
				sign = 1
			}
			else if (signinput == "from") {
				sign = -1
			}
			else {
				console.log("signinput not to or from");
			};
		}
		else {
			console.log(document.getElementById('customdateyear').value)
		};
	}
	else {
		console.log("datenow not 1-4");
	};
};

function custom() {
	var inputdateyear = document.getElementById('customdateyear').value;
	var inputdatemonth = document.getElementById('customdatemonth').value;
	var inputdateday = document.getElementById('customdateday').value;
	var inputdatetime = document.getElementById('customdatetime').value;
	return (inputdatemonth + " " + inputdateday + " " + inputdateyear + " " + inputdatetime)
};

function strinput(input,n) {
	var inputstr = new String(input);
	return inputstr.substr(0,n);
};

function split(timetosplit) {
	str = new String(timetosplit);
	var split = str.split(".");
	return split
};

function adds(inputnum,inputword) {
	if (inputnum == 1) {
		return (inputnum += inputword += " ");
	}
	else {
		return (inputnum += inputword += "s ");
	}
};

function month12(month12) {
	if (month12 <= 12) {
		return month12;
	}
	else {
		while (month12 > 12) {
			month12 = month12 - 12;
		}
		return month12;
	}
};

function defualtview() {
	var yearstill = 0;
	var monthstill = 0;
	var strofdatenow = new String(new Date());
	// dayofweek , month , day , year
	var strofdatewanted = new String(date);
	// month , day , year
	var yearofdatewanted = strofdatewanted[2];
	var monthofdatewanted = getmonthnum(strofdatewanted.split(" ")[0]);
	var monthofdatenow = getmonthnum(strofdatenow.split(" ")[1]);
	// var dayofdatewanted = Number(strofdatewanted.split(" ")[1]);
	// var dayofdatenow = Number(strofdatenow.split(" ")[2]);
	var weekstill = 0;

	if (sign == 1) {
		var whichmonth = monthofdatenow;
		currentyear = new Date().getFullYear();
	}
	else if (sign == -1) {
		var whichmonth = monthofdatewanted;
		currentyear = yearofdatewanted;
	}
	else {console.log("sign is not 1 or -1 how tf")};

	while (daystill >= isleap(365)) {
		yearstill++;
		daystill = daystill - isleap(365);
		currentyear = currentyear + 1;
	};

	while (true) {
		if (daystill >= (daysinmonth(month12(whichmonth)))) {
			daystill = daystill - (daysinmonth(month12(whichmonth)));
			whichmonth = whichmonth + 1;
			monthstill++;
		}
		else {
			break;
		}
	};

	while (daystill >= 7) {
		weekstill++;
		daystill = daystill - 7;
	};

	var ddays = split(daystill);
	var dhours = split(ddays[1]/(Math.pow(10,ddays[1].length))*24);
	var dminutes = split(dhours[1]/(Math.pow(10,dhours[1].length))*60);
	var dseconds = split(dminutes[1]/(Math.pow(10,dminutes[1].length))*60);
	
	var yearword = adds(yearstill," Year");
	var monthword = adds(monthstill," Month");
	var weekword = adds(weekstill," Week");
	var dayword = adds(ddays[0]," Day");
	var hourword = adds(dhours[0]," Hour");
	var minuteword = adds(dminutes[0]," Minute");
	var secondword = adds(dseconds[0]," Second");
	
	return(yearword += monthword += weekword += dayword += hourword += minuteword += secondword)
};

function isleap(input) {
	if (((currentyear % 4 == 0) && (currentyear % 100 != 0)) || (currentyear % 400 == 0)) {
		return input + 1;
	}
	else return input;
};

function howlong() {
	deadline = new Date(date).getTime();
	now = new Date().getTime();
	howlongtill = sign*(deadline-now);
	d = new Date();
	daystillnotimezone = howlongtill/(1000*60*24*60);
	if (!playing) {
		daystill = daystillnotimezone + ((timezoneoffset - (sign*d.getTimezoneOffset()))/(60*24));
	};
	if (playing) {
		daystill = daystillnotimezone + (timezoneoffset/(60*24));
	};
	years = roundscale(daystill/(365.25),"years");
	months = roundscale(daystill/(30.4375),"months");
	weeks = roundscale(daystill/(7),"weeks");
	days = roundscale((daystill),"days");
	hours = roundscale((daystill*24),"hours");
	minutes = roundscale((daystill*60*24),"minutes");
	seconds = roundscale((daystill*60*60*24),"seconds");
	milisec = roundscale((daystill*60*60*24*1000),'milisec');

	document.getElementById("titlemw").innerHTML = titlemw;
	
	if (currentask == 0) {
		document.getElementById("time").innerHTML = milisec;
		document.getElementById("mw").innerHTML = "Miliseconds";
	}
	else if (currentask == 1) {
		document.getElementById("time").innerHTML = years;
		document.getElementById("mw").innerHTML = "Years";
	}
	else if (currentask == 2) {
		document.getElementById("time").innerHTML = months;
		document.getElementById("mw").innerHTML = "Months";
	}
	else if (currentask == 3) {
		document.getElementById("time").innerHTML = weeks;
		document.getElementById("mw").innerHTML = "Weeks";
	}
	else if (currentask == 4) {
		document.getElementById("time").innerHTML = days;
		document.getElementById("mw").innerHTML = "Days";
	}
	else if (currentask == 5) {
		document.getElementById("time").innerHTML = hours;
		document.getElementById("mw").innerHTML = "Hours";
	}
	else if (currentask == 6) {
		document.getElementById("time").innerHTML = minutes;
		document.getElementById("mw").innerHTML = "Minutes";
	}
	else if (currentask == 7) {
		document.getElementById("time").innerHTML = seconds;
		document.getElementById("mw").innerHTML = "Seconds";
	}
	else if (currentask == 8) {
		document.getElementById("time").innerHTML = defualtview();
		document.getElementById("mw").innerHTML = "";
	}
	else {console.log("Currentask not 0-8")};

	if (playing && daystill <= 0) {
		stopplayingshootshoot();
	};
	
	window.setInterval(function(){
		howlong();
		}, 180);
};

function roundscale (num,thing) {
	switch (thing) {
		case "milisec":
			return addlength(num,1,true)
		case "seconds":
			return addlength(num,2,false)
		case "minutes":
			return addlength(num,5,false)
		case "hours":
			return addlength(num,6,false)
		case "days":
			return addlength(num,8,false)
		case "weeks":
			return addlength(num,9,false)
		case "months":
			return addlength(num,10,false)
		case "years":
			return addlength(num,10,false)
		default: console.log("thing not recognized in roundscale");
	}
};

function addlength(num,n,ismilisec){
	var str = new String(num);
	var split = str.split(".");
	var whole = split[0];
	var decimal = new String(split[1]);
	if (ismilisec) {
		return whole;
	}
	if (str.includes(".")) {
		decimal = decimal
	}
	else decimal = new String;
	while (decimal.length < n+1) {
		decimal += "0"
	};
	var decimalwanted = decimal.substr(0,n);
	return (whole + "." + decimalwanted)
};

///////////////////////////////Game Shit///////////////////////////////////////////////////////////////////////////////////////////

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

var p1r = 30;
var p1x = innerHeight/2;
var p1y = innerHeight/2;
var p1dx = 0;
var p1dy = 0;
var p1c = 'white';

var bullets = [];
var player;
var enemies = [];
var bombenemies = [];
var playerfreeze = false;
var bombs = [];
var playing = false;
var mousex;
var mousey;
var p1bulldirx;
var p1bulldiry;
var playerdxchange = 0;
var playerdychange = 0;

function calcbulldir (){
	p1bulldirx = -10 * ((player.x-mousex)/(Math.sqrt(Math.pow((player.x-mousex),2)+(Math.pow((player.y-mousey),2)))));
	p1bulldiry = -10 * ((player.y-mousey)/(Math.sqrt(Math.pow((player.x-mousex),2)+(Math.pow((player.y-mousey),2)))));
};

function startplayingshootshoot() {
	player = new Player(p1x,p1y,p1dx,p1dy,p1r,p1c);
	playing = true;
	animate();
	document.getElementById('goaway').style.visibility = 'hidden';
	document.getElementById('gamedisplay').style.visibility = 'visible';
	document.getElementById('leveldisplay').innerHTML = 'Level: ' + currentlevel;
	document.getElementById('leveldisplay').style.visibility = 'visible';
	document.getElementById('ammodisplay').style.visibility = 'visible';
	timezoneoffset = 5;
	date = new Date();
	titlemw = "Welcome to Shootshoot!";
	document.getElementById('canvas').style.zIndex = 1;
	document.getElementById('headingthatsaystime').style.visibility = 'hidden';
	currentask = 7;
	ammo = 20;
	bombsleft = 2;
	lastcheck = 1;
	check = 0;
	checkother = 0;
	level = 0;
	currentlevel = 0;
	enemyspawnrate = 5;
	enemyshootrate = 4;
	enemyradius = 40;
	enemybulletspeed = 2;
	enemyspeed = 10;
	checklevel = 0;
	bombenemyspawnrate = 0;
	bombenemyshootrate = 0;
	freezecheck = 0;
};

function stopplayingshootshoot() {
	playing = false;
	bullets = [];
	enemies = [];
	bombenemies = [];
	bombs = [];
	player = undefined;
	document.getElementById('canvas').style.zIndex = -1;
	ctx.clearRect(0,0,innerWidth,innerHeight);
	changedate(defaultdatenow);
	document.getElementById('goaway').style.visibility = 'visible';
	document.getElementById('gamedisplay').style.visibility = 'hidden';
	document.getElementById('leveldisplay').style.visibility = 'hidden';
	document.getElementById('ammodisplay').style.visibility = 'hidden';
	document.getElementById('time').style.visibility = 'visible';
	document.getElementById('headingthatsaystime').style.visibility = 'visible';
	timezoneoffset = 480;
	currentask = 8;
	document.getElementById("mw").style.visibility = 'visible';
	checklevel = 0;
};

function win() {
	titlemw = 'You Win!';
	document.getElementById('leveldisplay').style.visibility = 'hidden';
	document.getElementById('ammodisplay').style.visibility = 'hidden';
	document.getElementById('time').style.visibility = 'hidden';
	document.getElementById("mw").style.visibility = 'hidden';
	timesplayed += 1;
	timezoneoffset = 0.2;
};

window.addEventListener('click', function () {
	if (playing) {attack();};
});

window.addEventListener('mousemove', function (event) {
	mousex = event.x;
	mousey = event.y;
});

window.addEventListener('keydown',function(event){Key.onKeydown(event);},false);
window.addEventListener('keyup',function(event){Key.onKeyup(event);},false);

var pressed = [];
var Key = {
	onKeydown: function(event) {
		this.event = event
		if (!pressed.includes(this.event.keyCode)) {
			pressed.push(this.event.keyCode);
		};
	},
	onKeyup: function(event) {
		this.event = event;
		for (var i = 0; i < pressed.length; i++) {
			if (pressed[i] == this.event.keyCode) {
				pressed.splice(i,1);
			};
		};
	}
};

function attack() {
	if (playing) {
		if (ammo > 0) {
			calcbulldir();
			bullets.push(new GoodBullet(player.x,player.y,p1bulldirx,p1bulldiry,8,'white'));
			ammo = ammo - 1;
			document.getElementById('ammodisplay').innerHTML = 'Bullets: ' + ammo + '  Bombs: ' + bombsleft;
		}
		else {return};
	}
	else {return};
};

function spawnenemy() {
	enemies.push(new Enemy(Math.random()*(innerWidth-40),Math.random()*(innerHeight-40),(Math.random() - 0.5) * enemyspeed,(Math.random() - 0.5) * enemyspeed,enemyradius,'red'));
};

function spawnbombenemy() {
	bombenemies.push(new BombEnemy(Math.random()*(innerWidth-40),Math.random()*(innerHeight-40),(Math.random() - 0.5) * enemyspeed,(Math.random() - 0.5) * enemyspeed,enemyradius,'#706b00'));
};

function Player (x,y,dx,dy,radius,color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;
	this.mass = this.radius*3;

	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
		ctx.strokeStyle = this.color;
		ctx.stroke();
		ctx.fillStyle = this.color;
		ctx.fill();
	};

	this.moving = function() {
		this.dx = playerdxchange;
		this.dy = playerdychange;
	}

	this.update = function() {
		if (!playerfreeze) {
			if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
				this.dx = -this.dx;
				if (this.x + this.radius > innerWidth) {
					this.x -= this.x + this.radius - innerWidth;
				};
				if (this.x - this.radius < 0) {
					this.x += this.radius - this.x;
				};
			};
			if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
				this.dy = -this.dy
				if (this.y + this.radius > innerHeight) {
					this.y -= this.y + this.radius - innerHeight;
				};
				if (this.y - this.radius < 0) {
					this.y += this.radius - this.y;
				};
			};

			this.x += this.dx;
			this.y += this.dy;
		};
		this.draw();
	};
};

var enemiesids = 0;
function Enemy (x,y,dx,dy,radius,color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;
	this.mass = this.radius*3;
	this.id = enemiesids;
	enemiesids += 1;

	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
		ctx.strokeStyle = this.color;
		ctx.stroke();
		ctx.fillStyle = this.color;
		ctx.fill();
	};

	this.shoot = function() {
		this.bulldx = enemybulletspeed * ((player.x-this.x)/(Math.sqrt(Math.pow((player.x-this.x),2)+(Math.pow((player.y-this.y),2)))));
		this.bulldy = enemybulletspeed * ((player.y-this.y)/(Math.sqrt(Math.pow((player.x-this.x),2)+(Math.pow((player.y-this.y),2)))));
		bullets.push(new BadBullet(this.x,this.y,this.bulldx,this.bulldy,5,'pink'));
	};

	this.update = function() {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
			if (this.x + this.radius > innerWidth) {
				this.x -= this.x + this.radius - innerWidth;
			};
			if (this.x - this.radius < 0) {
				this.x += this.radius - this.x;
			};
		};
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy
			if (this.y + this.radius > innerHeight) {
				this.y -= this.y + this.radius - innerHeight;
			};
			if (this.y - this.radius < 0) {
				this.y += this.radius - this.y;
			};
		};
		if (Math.abs(this.x - player.x) < this.radius + player.radius && Math.abs(this.y - player.y) < this.radius + player.radius) {
			//bouncing off player
			this.distance = Math.sqrt(Math.pow((this.x-player.x),2)+Math.pow((this.y-player.y),2));
			this.overlap = this.distance - this.radius - player.radius;
			this.x -= this.overlap * (this.x - player.x) / this.distance;
			this.y -= this.overlap * (this.y - player.y) / this.distance;
			this.normalx = (player.x - this.x) / this.distance;
			this.normaly = (player.y - this.y) / this.distance;
			this.tangentialvx = -this.normaly;
			this.tangentialvy = this.normalx;
			this.tanvectordot = (this.dx * this.tangentialvx) + (this.dy * this.tangentialvy);
			this.tanvectordot2 = (player.dx * this.tangentialvx) + (player.dy * this.tangentialvy)
			this.normaldot = (this.dx * this.normalx) + (this.dy * this.normaly);
			this.normaldot2 = (player.dx * this.normalx) + (player.dy * this.normaly);
			this.m1 = (this.normaldot * (this.mass - player.mass) + 2 * player.mass * this.normaldot2) / (this.mass + player.mass);
			this.m2 = (this.normaldot2 * (player.mass - this.mass) + 2 * this.mass * this.normaldot) / (this.mass + player.mass);
			this.dx = this.tangentialvx * this.tanvectordot + this.normalx * this.m1;
			this.dy = this.tangentialvy * this.tanvectordot + this.normaly * this.m1;
			player.dx = this.tangentialvx * this.tanvectordot2 + this.normalx * this.m2;
			player.dy = this.tangentialvy * this.tanvectordot2 + this.normaly * this.m2;
		};
		for (var i = 0; i < enemies.length; i++) {
			if (enemies[i].id !== this.id) {
				if (Math.sqrt(Math.pow((this.x-enemies[i].x),2)+Math.pow((this.y-enemies[i].y),2)) < this.radius + enemies[i].radius) {
					//bouncing off other enemies
					this.distance = Math.sqrt(Math.pow((this.x-enemies[i].x),2)+Math.pow((this.y-enemies[i].y),2));
					this.overlap = this.distance - this.radius - enemies[i].radius;
					this.x -= this.overlap * (this.x - enemies[i].x) / this.distance;
					this.y -= this.overlap * (this.y - enemies[i].y) / this.distance;
					this.normalx = (enemies[i].x - this.x) / this.distance;
					this.normaly = (enemies[i].y - this.y) / this.distance;
					this.tangentialvx = -this.normaly;
					this.tangentialvy = this.normalx;
					this.tanvectordot = (this.dx * this.tangentialvx) + (this.dy * this.tangentialvy);
					this.tanvectordot2 = (enemies[i].dx * this.tangentialvx) + (enemies[i].dy * this.tangentialvy)
					this.normaldot = (this.dx * this.normalx) + (this.dy * this.normaly);
					this.normaldot2 = (enemies[i].dx * this.normalx) + (enemies[i].dy * this.normaly);
					this.m1 = (this.normaldot * (this.mass - enemies[i].mass) + 2 * enemies[i].mass * this.normaldot2) / (this.mass + enemies[i].mass);
					this.m2 = (this.normaldot2 * (enemies[i].mass - this.mass) + 2 * this.mass * this.normaldot) / (this.mass + enemies[i].mass);
					this.dx = this.tangentialvx * this.tanvectordot + this.normalx * this.m1;
					this.dy = this.tangentialvy * this.tanvectordot + this.normaly * this.m1;
					enemies[i].dx = this.tangentialvx * this.tanvectordot2 + this.normalx * this.m2;
					enemies[i].dy = this.tangentialvy * this.tanvectordot2 + this.normaly * this.m2;
				};
			};
		};
		for (var i = 0; i < bombenemies.length; i++) {
			if (Math.sqrt(Math.pow((this.x-bombenemies[i].x),2)+Math.pow((this.y-bombenemies[i].y),2)) < this.radius + bombenemies[i].radius) {
				//bouncing off bomb enemies
				this.distance = Math.sqrt(Math.pow((this.x-bombenemies[i].x),2)+Math.pow((this.y-bombenemies[i].y),2));
				this.overlap = this.distance - this.radius - bombenemies[i].radius;
				this.x -= this.overlap * (this.x - bombenemies[i].x) / this.distance;
				this.y -= this.overlap * (this.y - bombenemies[i].y) / this.distance;
				this.normalx = (bombenemies[i].x - this.x) / this.distance;
				this.normaly = (bombenemies[i].y - this.y) / this.distance;
				this.tangentialvx = -this.normaly;
				this.tangentialvy = this.normalx;
				this.tanvectordot = (this.dx * this.tangentialvx) + (this.dy * this.tangentialvy);
				this.tanvectordot2 = (bombenemies[i].dx * this.tangentialvx) + (bombenemies[i].dy * this.tangentialvy)
				this.normaldot = (this.dx * this.normalx) + (this.dy * this.normaly);
				this.normaldot2 = (bombenemies[i].dx * this.normalx) + (bombenemies[i].dy * this.normaly);
				this.m1 = (this.normaldot * (this.mass - bombenemies[i].mass) + 2 * bombenemies[i].mass * this.normaldot2) / (this.mass + bombenemies[i].mass);
				this.m2 = (this.normaldot2 * (bombenemies[i].mass - this.mass) + 2 * this.mass * this.normaldot) / (this.mass + bombenemies[i].mass);
				this.dx = this.tangentialvx * this.tanvectordot + this.normalx * this.m1;
				this.dy = this.tangentialvy * this.tanvectordot + this.normaly * this.m1;
				bombenemies[i].dx = this.tangentialvx * this.tanvectordot2 + this.normalx * this.m2;
				bombenemies[i].dy = this.tangentialvy * this.tanvectordot2 + this.normaly * this.m2;
			};
		};
		if (this.dx > maxenemyspeed) {
			this.dx = maxenemyspeed;
		};
		if (this.dx < -maxenemyspeed) {
			this.dx = -maxenemyspeed
		};
		if (this.dy > maxenemyspeed) {
			this.dy = maxenemyspeed;
		};
		if (this.dy < -maxenemyspeed) {
			this.dy = -maxenemyspeed
		};
		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	};
};

var bombenemiesids = 0;
function BombEnemy (x,y,dx,dy,radius,color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;
	this.mass = this.radius*3;
	this.id = bombenemiesids;
	bombenemiesids += 1;

	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
		ctx.strokeStyle = this.color;
		ctx.stroke();
		ctx.fillStyle = this.color;
		ctx.fill();
	};

	this.shoot = function() {
		this.bulldx = (enemybulletspeed/2) * ((player.x-this.x)/(Math.sqrt(Math.pow((player.x-this.x),2)+(Math.pow((player.y-this.y),2)))));
		this.bulldy = (enemybulletspeed/2) * ((player.y-this.y)/(Math.sqrt(Math.pow((player.x-this.x),2)+(Math.pow((player.y-this.y),2)))));
		bombs.push(new BadBomb(this.x,this.y,this.bulldx,this.bulldy,15,'yellow',2.5,100));
	};

	this.update = function() {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
			if (this.x + this.radius > innerWidth) {
				this.x -= this.x + this.radius - innerWidth;
			};
			if (this.x - this.radius < 0) {
				this.x += this.radius - this.x;
			};
		};
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy
			if (this.y + this.radius > innerHeight) {
				this.y -= this.y + this.radius - innerHeight;
			};
			if (this.y - this.radius < 0) {
				this.y += this.radius - this.y;
			};
		};
		if (Math.abs(this.x - player.x) < this.radius + player.radius && Math.abs(this.y - player.y) < this.radius + player.radius) {
			//bouncing off player
			this.distance = Math.sqrt(Math.pow((this.x-player.x),2)+Math.pow((this.y-player.y),2));
			this.overlap = this.distance - this.radius - player.radius;
			this.x -= this.overlap * (this.x - player.x) / this.distance;
			this.y -= this.overlap * (this.y - player.y) / this.distance;
			this.normalx = (player.x - this.x) / this.distance;
			this.normaly = (player.y - this.y) / this.distance;
			this.tangentialvx = -this.normaly;
			this.tangentialvy = this.normalx;
			this.tanvectordot = (this.dx * this.tangentialvx) + (this.dy * this.tangentialvy);
			this.tanvectordot2 = (player.dx * this.tangentialvx) + (player.dy * this.tangentialvy)
			this.normaldot = (this.dx * this.normalx) + (this.dy * this.normaly);
			this.normaldot2 = (player.dx * this.normalx) + (player.dy * this.normaly);
			this.m1 = (this.normaldot * (this.mass - player.mass) + 2 * player.mass * this.normaldot2) / (this.mass + player.mass);
			this.m2 = (this.normaldot2 * (player.mass - this.mass) + 2 * this.mass * this.normaldot) / (this.mass + player.mass);
			this.dx = this.tangentialvx * this.tanvectordot + this.normalx * this.m1;
			this.dy = this.tangentialvy * this.tanvectordot + this.normaly * this.m1;
			player.dx = this.tangentialvx * this.tanvectordot2 + this.normalx * this.m2;
			player.dy = this.tangentialvy * this.tanvectordot2 + this.normaly * this.m2;
		};
		if (this.dx > maxenemyspeed) {
			this.dx = maxenemyspeed;
		};
		if (this.dx < -maxenemyspeed) {
			this.dx = -maxenemyspeed
		};
		if (this.dy > maxenemyspeed) {
			this.dy = maxenemyspeed;
		};
		if (this.dy < -maxenemyspeed) {
			this.dy = -maxenemyspeed
		};
		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	};
};

function GoodBullet(x,y,dx,dy,radius,color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;
	this.exist = true

	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
		ctx.strokeStyle = this.color;
		ctx.lineWidth = 4;
		ctx.stroke();
		
	};

	this.update = function() {
		if (this.x >= innerWidth || this.x <= 0) {
			this.exist = false;
		};
		if (this.y >= innerHeight || this.y <= 0) {
			this.exist = false;
		};
		for (var i = 0; i < enemies.length; i++) {
			if (Math.abs(enemies[i].x - this.x) < enemies[i].radius + this.radius && Math.abs(enemies[i].y - this.y) < enemies[i].radius + this.radius) {
				enemies.splice(i,1);
				timezoneoffset = timezoneoffset + 0.25;
			};
		};
		for (var i = 0; i < bombenemies.length; i++) {
			if (Math.abs(bombenemies[i].x - this.x) < bombenemies[i].radius + this.radius && Math.abs(bombenemies[i].y - this.y) < bombenemies[i].radius + this.radius) {
				bombenemies.splice(i,1);
				timezoneoffset = timezoneoffset + 0.25;
				bombsleft += 1;
			};
		};

		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	};
};

function BadBullet(x,y,dx,dy,radius,color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;
	this.exist = true;

	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
		ctx.strokeStyle = this.color;
		ctx.stroke();
	};

	this.update = function() {
		if (this.x >= innerWidth || this.x <= 0) {
			this.exist = false;
		};
		if (this.y >= innerHeight || this.y <= 0) {
			this.exist = false;
		};
		if (Math.abs(this.x - player.x) < this.radius + player.radius && Math.abs(this.y - player.y) < this.radius + player.radius) {
			this.exist = false;
			timezoneoffset = timezoneoffset - 0.5;
		};
		
		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	};
};

function BadBomb(x,y,dx,dy,radius,color,rate,maxradius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;
	this.exist = true;
	this.rate = rate;
	this.maxradius = maxradius;
	this.hit = false;

	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
		ctx.strokeStyle = this.color;
		ctx.stroke();
		ctx.fillStyle = this.color;
		ctx.fill();
	};

	this.explode = function() {
		if (this.radius < this.maxradius) {
			this.radius = this.radius + this.rate;
			this.draw();
			if (Math.abs(this.x - player.x) < this.radius + player.radius && Math.abs(this.y - player.y) < this.radius + player.radius) {
				playerfreeze = true;
			};
		}
		else {
			this.exist = false;
		};
		
	};
	
	this.update = function() {
		if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0 || this.y + this.radius >= innerHeight || this.y - this.radius <= 0) {
			this.exist = false;
		};
		if (Math.abs(this.x - player.x) < this.radius + player.radius && Math.abs(this.y - player.y) < this.radius + player.radius) {
			this.hit = true;
		};
		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	};
};

function GoodBomb(x,y,dx,dy,radius,color,rate,maxradius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;
	this.exist = true;
	this.rate = rate;
	this.maxradius = maxradius;
	this.hit = false;

	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
		ctx.strokeStyle = this.color;
		ctx.stroke();
		ctx.fillStyle = this.color;
		ctx.fill();
	};

	this.explode = function() {
		if (this.radius < this.maxradius) {
			this.radius = this.radius + this.rate;
			this.draw();
			for (var i = 0; i < enemies.length; i++) {
				if (Math.abs(enemies[i].x - this.x) < enemies[i].radius + this.radius && Math.abs(enemies[i].y - this.y) < enemies[i].radius + this.radius) {
					enemies.splice(i,1);
					timezoneoffset = timezoneoffset + 0.25;
				};
			};
			for (var i = 0; i < bombenemies.length; i++) {
				if (Math.abs(bombenemies[i].x - this.x) < bombenemies[i].radius + this.radius && Math.abs(bombenemies[i].y - this.y) < bombenemies[i].radius + this.radius) {
					bombenemies.splice(i,1);
					timezoneoffset = timezoneoffset + 0.25;
					bombsleft += 1;
				};
			};
		}
		else {
			this.exist = false;
		};
	};

	this.update = function() {
		if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0 || this.y + this.radius >= innerHeight || this.y - this.radius <= 0) {
			this.exist = false;
		};
		for (var i = 0; i < enemies.length; i++) {
			if (Math.abs(enemies[i].x - this.x) < enemies[i].radius + this.radius && Math.abs(enemies[i].y - this.y) < enemies[i].radius + this.radius) {
				enemies.splice(i,1);
				timezoneoffset = timezoneoffset + 0.25;
				this.hit = true;
			};
		};
		for (var i = 0; i < bombenemies.length; i++) {
			if (Math.abs(bombenemies[i].x - this.x) < bombenemies[i].radius + this.radius && Math.abs(bombenemies[i].y - this.y) < bombenemies[i].radius + this.radius) {
				bombenemies.splice(i,1);
				timezoneoffset = timezoneoffset + 0.25;
				this.hit = true;
			};
		};

		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	};
};

function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,innerWidth,innerHeight);
	for (var i = 0; i < bombs.length; i++) {
		if (bombs[i].x >= innerWidth || bombs[i].x <= 0 || bombs[i].y >= innerHeight || bombs[i].y <= 0 || bombs[i].hit) {
			bombs[i].explode();
		}
		else {bombs[i].update()}
	}
	for (var i = 0; i < bullets.length; i++) {
		bullets[i].update();
		if (!bullets[i].exist) {
			bullets.splice(i,1);
		}
	};
	if (typeof player !== 'undefined') {player.update()};
	for (var i = 0; i < enemies.length; i++) {
		enemies[i].update();
	};
	for (var i = 0; i < bombenemies.length; i++) {
		bombenemies[i].update();
	};
	checkchange();
	changemov();
};

var ammo;
var timesplayed = 0;
var bombsleft;
var lastcheck;
var check;
var checkother;
var level;
var currentlevel;
var enemyspawnrate;
var enemyshootrate;
var enemyradius;
var enemybulletspeed;
var enemyspeed;
var checklevel;
var bombenemyspawnrate;
var bombenemyshootrate;
var freezecheck;
var maxenemyspeed;
function checkchange() {
	if (checklevel !== currentlevel) {
		bombsleft += 1;
		checklevel = currentlevel;
	}
	if (level < 1) {
		currentlevel = 0;
		enemyspawnrate = 5;
		enemyshootrate = 4;
		enemyradius = 40;
		enemybulletspeed = 2;
		enemyspeed = 10;
		bombenemyspawnrate = 0;
		bombenemyshootrate = 0;
		maxenemyspeed = 14;
	}
	if (level > 1 && level < 2) {
		currentlevel = 1;
		enemyradius = 37;
		enemyspawnrate = 5;
		enemyshootrate = 3;
		enemybulletspeed = 2.5;
		enemyspeed = 12;
		bombenemyspawnrate = 18;
		bombenemyshootrate = 10;
		maxenemyspeed = 16;
	}
	else if (level > 2 && level < 3) {
		currentlevel = 2;
		enemyradius = 34;
		enemyspawnrate = 4;
		enemyshootrate = 3;
		enemybulletspeed = 3;
		enemyspeed = 14;
		bombenemyspawnrate = 17;
		bombenemyshootrate = 10;
		maxenemyspeed = 18;
	}
	else if (level > 3 && level < 4) {
		currentlevel = 3;
		enemyradius = 31;
		enemyspawnrate = 4;
		enemyshootrate = 2;
		enemybulletspeed = 3.5;
		enemyspeed = 16;
		bombenemyspawnrate = 17;
		bombenemyshootrate = 9;
		maxenemyspeed = 20;
	}
	else if (level > 4 && level < 5) {
		currentlevel = 4;
		enemyradius = 28;
		enemyspawnrate = 3;
		enemyshootrate = 2;
		enemybulletspeed = 4;
		enemyspeed = 18;
		bombenemyspawnrate = 16;
		bombenemyshootrate = 9;
		maxenemyspeed = 22;
	}
	else if (level > 5 && level < 6) {
		currentlevel = 5;
		enemyradius = 25;
		enemyspawnrate = 3;
		enemyshootrate = 1;
		enemybulletspeed = 4.5;
		enemyspeed = 20;
		bombenemyspawnrate = 16;
		bombenemyshootrate = 8;
		maxenemyspeed = 24;
	}
	else if (level > 6 && level < 7) {
		currentlevel = 6;
		enemyradius = 22;
		enemyspawnrate = 2;
		enemyshootrate = 1;
		enemybulletspeed = 5;
		enemyspeed = 22;
		bombenemyspawnrate = 15;
		bombenemyshootrate = 8;
		maxenemyspeed = 26;
	}
	else if (level > 7 && level < 8) {
		currentlevel = 7;
		enemyradius = 19;
		enemyspawnrate = 1;
		enemyshootrate = 1;
		enemybulletspeed = 5.5;
		enemyspeed = 24;
		bombenemyspawnrate = 15;
		bombenemyshootrate = 7;
		maxenemyspeed = 28;
	}
	else if (level > 8 && level < 9) {
		currentlevel = 8;
		enemyradius = 16;
		enemyspawnrate = 1;
		enemyshootrate = 1;
		enemybulletspeed = 6;
		enemyspeed = 26;
		bombenemyspawnrate = 14;
		bombenemyshootrate = 6;
		maxenemyspeed = 30;
	}
	else if (level > 9 && level < 10) {
		currentlevel = 9;
		enemyradius = 13;
		enemyspawnrate = 1;
		enemyshootrate = 1;
		enemybulletspeed = 6.5;
		enemyspeed = 28;
		bombenemyspawnrate = 14;
		bombenemyshootrate = 5;
		maxenemyspeed = 32;
	}
	else if (level > 10) {
		win();
	}
	if (enemyspawnrate - timesplayed > 0) {
		enemyspawnrate -= timesplayed;
	};
	if (enemyshootrate - timesplayed > 0) {
		enemyshootrate -= timesplayed;
	};
	if (bombenemyspawnrate - timesplayed > 0) {
		bombenemyspawnrate -= timesplayed;
	};
	if (bombenemyshootrate - timesplayed > 0) {
		bombenemyshootrate -= timesplayed;
	};
	enemybulletspeed += timesplayed*2;
	enemyspeed += timesplayed*4;
	if (enemyradius - timesplayed*2 > 0) {
		enemyradius -= timesplayed*2;
	};
	document.getElementById('leveldisplay').innerHTML = 'Level: ' + currentlevel;
	if (lastcheck != check && playing) {
		lastcheck = check;
		if (checkother % enemyshootrate == 0) {
			for (var i = 0; i < enemies.length; i++) {
				enemies[i].shoot();
			};
		};
		if (checkother % enemyspawnrate == 0) {
			spawnenemy();
		};
		if (checkother % bombenemyspawnrate == 0) {
			spawnbombenemy();
		};
		if (checkother % bombenemyshootrate == 0) {
			for (var i = 0; i < bombenemies.length; i++) {
				bombenemies[i].shoot();
			};
		};
		if (playerfreeze) {
			if (freezecheck == 0) {
				freezecheck = lastcheck + 1;
			};
			if (lastcheck == freezecheck) {
				playerfreeze = false;
				freezecheck = 0;
			};
		};
		checkother++;
		level += (1/30);
		ammo = ammo + 1;
		document.getElementById('ammodisplay').innerHTML = 'Bullets: ' + ammo + '  Bombs: ' + bombsleft;
	};
	check = Math.round(new Date().getTime() / 1000);
};

var bombing = false;
var playerspeedaccelrate = 1;
var maxplayerspeed = 5;
function changemov () {
	if (pressed.includes(16)) {
		playerspeedaccelrate = 3;
		maxplayerspeed = 15;
	}
	else {
		playerspeedaccelrate = 1;
		maxplayerspeed = 5;
	};
	if (pressed.includes(87)) {
		if (playerdychange > -maxplayerspeed) {
			playerdychange = playerdychange - playerspeedaccelrate;
		};
	}
	if (pressed.includes(83)) {
		if (playerdychange < maxplayerspeed) {
			playerdychange = playerdychange + playerspeedaccelrate;
		};
	};
	if ((!pressed.includes(87) && !pressed.includes(83)) || (pressed.includes(87) && pressed.includes(83))) {
		if (playerdychange < 0) {
			playerdychange = playerdychange + playerspeedaccelrate;
		}
		if (playerdychange > 0) {
			playerdychange = playerdychange - playerspeedaccelrate;
		}
	};
	if (pressed.includes(65)) {
		if (playerdxchange > -maxplayerspeed) {
			playerdxchange = playerdxchange - playerspeedaccelrate;
		}
	};
	if (pressed.includes(68)) {
		if (playerdxchange < maxplayerspeed) {
			playerdxchange = playerdxchange + playerspeedaccelrate;
		}
	};
	if ((!pressed.includes(65) && !pressed.includes(68)) || (pressed.includes(65) && pressed.includes(68))) {
		if (playerdxchange < 0) {
			playerdxchange = playerdxchange + playerspeedaccelrate;
		}
		if (playerdxchange > 0) {
			playerdxchange = playerdxchange - playerspeedaccelrate;
		}
	};
	if (playing) {
		if(!playerfreeze){player.moving()};
	};
	if (pressed.includes(32)) {
		if (!bombing && bombsleft > 0) {
			calcbulldir();
			bombs.push(new GoodBomb(player.x,player.y,(p1bulldirx/2),(p1bulldiry/2),25,'orange',3,275));
			bombsleft = bombsleft - 1;
			document.getElementById('ammodisplay').innerHTML = 'Bullets: ' + ammo + '  Bombs: ' + bombsleft;
		};
		bombing = true;
	}
	else {bombing = false};
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var poolplayer;
var playingpool;
var balls = [];
var holes = [];
var poolplayerx;
var poolplayery;
var playerballtypeword;
var maxballspeed;

function startplayingpool() {
	playerballtypeword = 'Hit in a Ball!';
	poolplayerx = innerWidth / 5;
	poolplayery = innerHeight / 2;
	playingpool = true;
	poolplayer = new PoolPlayer(poolplayerx,poolplayery,0,0,30,'white');
	spawnholes();
	spawnballs();
	animatepool();
	document.getElementById('goaway').style.visibility = 'hidden';
	document.getElementById('gamedisplay').style.visibility = 'visible';
	document.getElementById('leveldisplay').innerHTML = playerballtypeword;
	document.getElementById('leveldisplay').style.visibility = 'visible';
	document.getElementById('ammodisplay').style.visibility = 'visible';
	titlemw = "Welcome to Pool!";
	document.getElementById('canvas').style.zIndex = 1;
	document.getElementById('headingthatsaystime').style.visibility = 'hidden';
	document.getElementById('time').style.visibility = 'hidden';
	document.getElementById("mw").style.visibility = 'hidden';
	currentask = 7;
};

function stopplayingpool() {
	playingpool = false;
	poolplayer = undefined;
	balls = [];
	holes = [];
	document.getElementById('canvas').style.zIndex = -1;
	ctx.clearRect(0,0,innerWidth,innerHeight);
	changedate(defaultdatenow);
	document.getElementById('goaway').style.visibility = 'visible';
	document.getElementById('gamedisplay').style.visibility = 'hidden';
	document.getElementById('leveldisplay').style.visibility = 'hidden';
	document.getElementById('ammodisplay').style.visibility = 'hidden';
	document.getElementById('time').style.visibility = 'visible';
	document.getElementById('headingthatsaystime').style.visibility = 'visible';
	currentask = 8;
	document.getElementById("mw").style.visibility = 'visible';
};

function winpool() {
	titlemw = 'You Win!';
	document.getElementById('leveldisplay').style.visibility = 'hidden';
	document.getElementById('ammodisplay').style.visibility = 'hidden';
};

function animatepool() {
	requestAnimationFrame(animatepool);
	ctx.clearRect(0,0,innerWidth,innerHeight);
	if (typeof poolplayer !== 'undefined') {poolplayer.update()};
	for (var i = 0; i < balls.length; i++) {
		balls[i].update();
		if (!balls.exist) {
			balls.splice(i,1);
		};
	};
	for (var i = 0; i < holes.length; i++) {
		holes[i].draw();
	};
};

function spawnholes() {
	holes.push(new Hole(innerWidth/2,50,30,'green'));
};

function spawnballs() {

};

function PoolPlayer (x,y,dx,dy,radius,color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;
	this.mass = this.radius*3;

	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
		ctx.strokeStyle = this.color;
		ctx.stroke();
		ctx.fillStyle = this.color;
		ctx.fill();
	};

	this.moving = function() {
		this.dx = playerdxchange;
		this.dy = playerdychange;
	}

	this.update = function() {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
			if (this.x + this.radius > innerWidth) {
				this.x -= this.x + this.radius - innerWidth;
			};
			if (this.x - this.radius < 0) {
				this.x += this.radius - this.x;
			};
		};
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy
			if (this.y + this.radius > innerHeight) {
				this.y -= this.y + this.radius - innerHeight;
			};
			if (this.y - this.radius < 0) {
				this.y += this.radius - this.y;
			};
		};
		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	};
};

var ballid = 0;
function Ball (x,y,dx,dy,radius,color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;
	this.mass = this.radius*3;
	this.id = ballid;
	this.exist = true;
	ballid += 1;

	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
		ctx.strokeStyle = this.color;
		ctx.stroke();
		ctx.fillStyle = this.color;
		ctx.fill();
	};

	this.update = function() {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
			if (this.x + this.radius > innerWidth) {
				this.x -= this.x + this.radius - innerWidth;
			};
			if (this.x - this.radius < 0) {
				this.x += this.radius - this.x;
			};
		};
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy
			if (this.y + this.radius > innerHeight) {
				this.y -= this.y + this.radius - innerHeight;
			};
			if (this.y - this.radius < 0) {
				this.y += this.radius - this.y;
			};
		};
		if (Math.abs(this.x - poolplayer.x) < this.radius + poolplayer.radius && Math.abs(this.y - poolplayer.y) < this.radius + poolplayer.radius) {
			//bouncing off poolplayer
			this.distance = Math.sqrt(Math.pow((this.x-poolplayer.x),2)+Math.pow((this.y-poolplayer.y),2));
			this.overlap = this.distance - this.radius - poolplayer.radius;
			this.x -= this.overlap * (this.x - poolplayer.x) / this.distance;
			this.y -= this.overlap * (this.y - poolplayer.y) / this.distance;
			this.normalx = (poolplayer.x - this.x) / this.distance;
			this.normaly = (poolplayer.y - this.y) / this.distance;
			this.tangentialvx = -this.normaly;
			this.tangentialvy = this.normalx;
			this.tanvectordot = (this.dx * this.tangentialvx) + (this.dy * this.tangentialvy);
			this.tanvectordot2 = (poolplayer.dx * this.tangentialvx) + (poolplayer.dy * this.tangentialvy)
			this.normaldot = (this.dx * this.normalx) + (this.dy * this.normaly);
			this.normaldot2 = (poolplayer.dx * this.normalx) + (poolplayer.dy * this.normaly);
			this.m1 = (this.normaldot * (this.mass - poolplayer.mass) + 2 * poolplayer.mass * this.normaldot2) / (this.mass + poolplayer.mass);
			this.m2 = (this.normaldot2 * (poolplayer.mass - this.mass) + 2 * this.mass * this.normaldot) / (this.mass + poolplayer.mass);
			this.dx = this.tangentialvx * this.tanvectordot + this.normalx * this.m1;
			this.dy = this.tangentialvy * this.tanvectordot + this.normaly * this.m1;
			poolplayer.dx = this.tangentialvx * this.tanvectordot2 + this.normalx * this.m2;
			poolplayer.dy = this.tangentialvy * this.tanvectordot2 + this.normaly * this.m2;
		};
		for (var i = 0; i < holes.length; i++) {
			if (Math.abs(this.x - hole[i].x) < this.radius + hole[i].radius && Math.abs(this.y - hole[i].y) < this.radius + hole[i].radius) {
				this.exist = false;
			};
		};
		if (this.dx > maxballspeed) {
			this.dx = maxballspeed;
		};
		if (this.dx < -maxballspeed) {
			this.dx = -maxballspeed
		};
		if (this.dy > maxballspeed) {
			this.dy = maxballspeed;
		};
		if (this.dy < -maxballspeed) {
			this.dy = -maxballspeed
		};
		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	};
};

function Hole (x,y,radius,color) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;

	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
		ctx.strokeStyle = this.color;
		ctx.stroke();
		ctx.fillStyle = this.color;
		ctx.fill();
	};
};