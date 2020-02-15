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
		titlemw = "since First Date";
	}
	else if (datewanted == 3) {
		date = "may 12 2020";
		titlemw = "to Summer Break";
		sign = 1;
	}
	else if (datewanted == 4) {
		if (document.getElementById('customdateyear').value == 'play') {
			startplaying();
		}
		else if (document.getElementById('customdateyear').value.length > 0) {
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
		}
	}
	else {
		console.log("datenow not 1-3");
	}
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
	d = new Date(date);
	daystillnotimezone = howlongtill/(1000*60*24*60);
	if (!playing) {
		daystill = daystillnotimezone + ((timezoneoffset - (d.getTimezoneOffset()))/(60*24));
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

	//gamestuff
	if (document.getElementById('customdateyear').value == 'play' && daystill <= 0) {
		stopplaying();
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var p1r = 30;
var p1x = innerHeight/2;
var p1y = innerHeight/2;
var p1dx = 5;
var p1dy = 5;
var p1c = 'white';

var bullets = [];
var player;
var enemies = [];
var playing = false;
var mousex;
var mousey;
var p1bulldirx;
var p1bulldiry;
var playerdxchange = 0;
var playerdychange = 0;
var playerdxchangebool = false;
var playerdychangebool = false;

function calcbulldir (){
	p1bulldirx = -7 * ((player.x-mousex)/(Math.sqrt(Math.pow((player.x-mousex),2)+(Math.pow((player.y-mousey),2)))));
	p1bulldiry = -7 * ((player.y-mousey)/(Math.sqrt(Math.pow((player.x-mousex),2)+(Math.pow((player.y-mousey),2)))));
};

function startplaying() {
	if (!playing) {
		player = new Player(p1x,p1y,p1dx,p1dy,p1r,p1c);
	};
	playing = true;
	document.getElementById('goaway').style.visibility = 'hidden';
	timezoneoffset = 5;
	date = new Date();
	titlemw = "to Play";
	document.getElementById('canvas').style.zIndex = 1;
};

function stopplaying() {
	playing = false;
	bullets = [];
	enemies = [];
	player = undefined;
	document.getElementById('canvas').style.zIndex = -1;
	ctx.clearRect(0,0,innerWidth,innerHeight);
	changedate(defaultdatenow);
	document.getElementById('goaway').style.visibility = 'visible';
};

window.addEventListener('click', function (event) {
	mousex = event.x;
	mousey = event.y;
	attack();
});

window.addEventListener('keydown',function(event){Key.onKeydown(event);},false);
window.addEventListener('keyup',function(event){Key.onKeyup(event);},false);

var pressed = [];
var Key = {
	onKeydown: function(event) {
		this.event = event
		if (!pressed.includes(this.event.key)) {
			pressed.push(this.event.key);
		}
	},
	onKeyup: function(event) {
		this.event = event;
		for (var i = 0; i < pressed.length; i++) {
			if (pressed[i] == this.event.key) {
				pressed.splice(i,1);
			}
		}
		console.log(pressed)
	}
};

function attack() {
	if (playing) {
		calcbulldir();
		bullets.push(new GoodBullet(player.x,player.y,p1bulldirx,p1bulldiry,5,'white'));
	}
	else {return};
};

function spawnenemy() {
	enemies.push(new Enemy(Math.random()*(innerWidth-40),Math.random()*(innerHeight-40),(Math.random() - 0.5) * 10,(Math.random() - 0.5) * 10,20,'red'));
};

function canvasstuff() {
	window.addEventListener('resize', resizeCanvas, false);
  
	function resizeCanvas() {
	  canvas.width = window.innerWidth;
	  canvas.height = window.innerHeight;
  	  drawStuff();
	}
	resizeCanvas();
  
	function drawStuff() {
	  animate();
	}
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

	this.stop = function() {
		this.dx = 0;
		this.dy = 0;
	}

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

function Enemy (x,y,dx,dy,radius,color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;
	this.shooting = true;
	this.mass = this.radius*3;

	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
		ctx.strokeStyle = this.color;
		ctx.stroke();
		ctx.fillStyle = this.color;
		ctx.fill();
	};

	this.shoot = function() {
		this.bulldx = 2 * ((player.x-this.x)/(Math.sqrt(Math.pow((player.x-this.x),2)+(Math.pow((player.y-this.y),2)))));
		this.bulldy = 2 * ((player.y-this.y)/(Math.sqrt(Math.pow((player.x-this.x),2)+(Math.pow((player.y-this.y),2)))));
		if (this.shooting) {
		bullets.push(new BadBullet(this.x,this.y,this.bulldx,this.bulldy,5,'red'));
		};
	};

	this.update = function() {
		if (this.shooting) {
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
		};
		if (Math.abs(this.x - player.x) < this.radius + player.radius && Math.abs(this.y - player.y) < this.radius + player.radius) {
			//bouncing off
			this.distance = Math.sqrt(Math.pow((this.x-player.x),2)+Math.pow((this.y-player.y),2));
			this.overlap = this.distance - this.radius - player.radius;
			this.x -= this.overlap * (this.x - player.x) / this.distance;
			this.y -= this.overlap * (this.y - player.y) / this.distance;
			this.normalx = (player.x - this.x) / this.distance;
			this.normaly = (player.y - this.y) / this.distance;
			this.tangentialvx = -this.normaly;
			this.tangentialvy = this.normalx;
			this.tanvector = (this.dx * this.tangentialvx) + (this.dy * this.tangentialvy);
			this.tanvector2 = (player.dx * this.tangentialvx) + (player.dy * this.tangentialvy)
			this.normaldot = (this.dx * this.normalx) + (this.dy * this.normaly);
			this.normaldot2 = (player.dx * this.normalx) + (player.dy * this.normaly);
			this.m1 = (this.normaldot * (this.mass - player.mass) + 2 * player.mass * this.normaldot2) / (this.mass + player.mass);
			this.m2 = (this.normaldot2 * (player.mass - this.mass) + 2 * this.mass * this.normaldot) / (this.mass + player.mass);
			this.dx = this.tangentialvx * this.tanvector + this.normalx * this.m1;
			this.dy = this.tangentialvy * this.tanvector + this.normaly * this.m1;
			player.dx = this.tangentialvx * this.tanvector2 + this.normalx * this.m2;
			player.dy = this.tangentialvy * this.tanvector2 + this.normaly * this.m2;
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

	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
		ctx.strokeStyle = this.color;
		ctx.lineWidth = 4;
		ctx.stroke();
		
	};

	this.update = function() {
		if (this.x >= innerWidth || this.x <= 0) {
			this.x = -100;
			this.y = -100;
			this.dx = 0;
			this.dy = 0;
		};
		if (this.y >= innerHeight || this.y <= 0) {
			this.x = -100;
			this.y = -100;
			this.dx = 0;
			this.dy = 0;
		};
		for (var i = 0; i < enemies.length; i++) {
			if (Math.abs(enemies[i].x - this.x) < enemies[i].radius + this.radius && Math.abs(enemies[i].y - this.y) < enemies[i].radius + this.radius) {
				enemies[i].x = -20;
				enemies[i].y = -20;
				enemies[i].dx = 0;
				enemies[i].dy = 0;
				enemies[i].shooting = false;
				timezoneoffset = timezoneoffset + 0.5;
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

	this.draw = function() {
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
		ctx.strokeStyle = this.color;
		ctx.stroke();
	};

	this.update = function() {
		if (this.x >= innerWidth || this.x <= 0) {
			this.x = -10;
			this.y = -10;
			this.dx = 0;
			this.dy = 0;
		};
		if (this.y >= innerHeight || this.y <= 0) {
			this.x = -10;
			this.y = -10;
			this.dx = 0;
			this.dy = 0;
		};
		if (Math.abs(this.x - player.x) < this.radius + player.radius && Math.abs(this.y - player.y) < this.radius + player.radius) {
			this.x = -10;
			this.y = -10;
			this.dx = 0;
			this.dy = 0;
			timezoneoffset = timezoneoffset - 0.5;
		};
		
		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	};
};

function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,innerWidth,innerHeight);
	for (var i = 0; i < bullets.length; i++) {
		bullets[i].update();
	};
	if (typeof player !== 'undefined') {player.update()};
	for (var i = 0; i < enemies.length; i++) {
		enemies[i].update();
	};
	checkchange();
	changemov();
};

var lastcheck = 1;
var check = 0;
var checkother = 0;
function checkchange() {
	if (lastcheck != check) {
		lastcheck = check;
		if (playing) {
			if (checkother % 2 == 0)
				for (var i = 0; i < enemies.length; i++) {
					enemies[i].shoot();
				};
		};
		checkother++;
		if (playing) {
			if (checkother % 5 == 0) {
				spawnenemy();
			}
		}
	};
	check = Math.round(new Date().getTime() / 1000);
};

function changemov () {
	if (pressed.includes('w')) {
		playerdychange = -5;
	}
	else if (pressed.includes('s')) {
		playerdychange = 5;
	}
	else {
		playerdychange = 0;
	}
	if (pressed.includes('a')) {
		playerdxchange = -5;
	}
	else if (pressed.includes('d')) {
		playerdxchange = 5;
	}
	else {
		playerdxchange = 0;
	};
	if (pressed.includes('r')) {
		player.stop();
	}
	if (playing) {
		player.moving();
	}
}