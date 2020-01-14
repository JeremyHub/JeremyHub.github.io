var currentask;

window.setTimeout(function setcurrentask() {
	currentask = 4;
},20)

function settask (val) {
	currentask = val;
	howlong();
}

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
}

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
}

function howlong(){
	var deadline = new Date("mar 14, 2020 18:00:00").getTime();
	var now = new Date().getTime();
	var howlongtill = deadline-now;
	var years = roundscale(howlongtill/(1000*60*60*24*7*30*12),"years");
	var months = roundscale(howlongtill/(1000*60*60*24*7*30),"months");
	var weeks = roundscale(howlongtill/(1000*60*60*24*7),"weeks");
	var days = roundscale(howlongtill/(1000*60*60*24),"days");
	var hours = roundscale(howlongtill/(1000*60*60),"hours");
	var minutes = roundscale(howlongtill/(1000*60),"minutes");
	var seconds = roundscale(howlongtill/(1000),"seconds");
	var milisec = howlongtill;
	
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
	else {
	console.log("ERROR");

	window.setInterval(function(){
		howlong();
		}, 57);
	}
}