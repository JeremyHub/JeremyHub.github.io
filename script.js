var currentask;
var date = "mar 14 2020 18:00:00";
var sign = 1;
var titlemw = "to Spring Break";
var datenow = 1;
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
var inputdateyear;
var inputdatemonth;
var inputdateday;
var inputdatetime;
var signinput;

window.setInterval(howlong(),120);

window.setTimeout(function setcurrentask() {
	currentask = 4;
	howlong();
},20);

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
		date = "mar 14 2020 18:00:00";
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
		if (document.getElementById('customdateyear').value.length > 0) {
			date = custom();
			titlemw = document.getElementById('sign').value + " " + date;
			signinput = document.getElementById('sign').value;
			if (signinput == "to") {
				sign = 1
			}
			else if (signinput == "From") {
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

function defualtview() {
	var deadline = new Date(date).getTime();
	var now = new Date().getTime();
	var howlongtill = sign*(deadline-now);
	var dyears = split(howlongtill/(1000*60*60*24*365.25));
	var dmonths = split(dyears[1]/(Math.pow(10,dyears[1].length))*12);
	var dweeks = split(dmonths[1]/(Math.pow(10,dmonths[1].length))*4.3482142857);
	var ddays = split(dweeks[1]/(Math.pow(10,dweeks[1].length))*7);
	var dhours = split(ddays[1]/(Math.pow(10,ddays[1].length))*24);
	var dminutes = split(dhours[1]/(Math.pow(10,dhours[1].length))*60);
	var dseconds = split(dminutes[1]/(Math.pow(10,dminutes[1].length))*60);
	var yearword = (dyears[0] += " Years ");
	var monthword = (dmonths[0] += " Months ");
	var weekword = (dweeks[0] += " Weeks ");
	var dayword = (ddays[0] += " Days ");
	var hourword = (dhours[0] += " Hours ");
	var minuteword = (dminutes[0] += " Minutes ");
	var secondword = (dseconds[0] += " Seconds ");
	return(yearword += monthword += weekword += dayword += hourword += minuteword += secondword)
};

function howlong() {
	var deadline = new Date(date).getTime();
	var now = new Date().getTime();
	var howlongtill = sign*(deadline-now);
	var years = roundscale(howlongtill/(1000*60*60*24*365.25),"years");
	var months = roundscale(howlongtill/(1000*60*60*24*30.4375),"months");
	var weeks = roundscale(howlongtill/(1000*60*60*24*7),"weeks");
	var days = roundscale(howlongtill/(1000*60*60*24),"days");
	var hours = roundscale(howlongtill/(1000*60*60),"hours");
	var minutes = roundscale(howlongtill/(1000*60),"minutes");
	var seconds = roundscale(howlongtill/(1000),"seconds");
	var milisec = howlongtill;
	document.getElementById("titlemw").innerHTML = titlemw;
	defualtview();
	
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
	else {
	console.log("Currentask not 0-7");

	window.setInterval(function(){
		howlong();
		}, 180);
	}
};

function roundscale (num,thing) {
	switch (thing) {
		case "milisec":
			return addlength(num,0)
		case "seconds":
			return addlength(num,2)
		case "minutes":
			return addlength(num,3)
		case "hours":
			return addlength(num,5)
		case "days":
			return addlength(num,6)
		case "weeks":
			return addlength(num,7)
		case "months":
			return addlength(num,9)
		case "years":
			return addlength(num,10)
		default: return "err"
	}
};

function addlength(num,n){
	var str = new String(num);
	var split = str.split(".");
	var whole = split[0];
	var decimal = new String(split[1]);
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