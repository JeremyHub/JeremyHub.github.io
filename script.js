var currentask;

window.setTimeout(function setcurrentask() {
	currentask = 4;
},20)

function settask (val) {
	currentask = val;
}

function roundscale (num,thing) {
	var str = new String(num);
	var l = str.length
	if (str.includes(".")) {
		var split = str.split(".");
		var whole = split[0];
		var decimal = new String(split[1]);
		var decimalwanted = decimal.substr(0,2);
		if (decimal.length >= 2) {
			return (whole + "." + decimalwanted)}
		if (decimal.length == 1) {
			return (whole + "." + decimalwanted + "0")}
		else return "err"
	}
	else return (num += ".00")
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
		}, 100);
	}}

//	var secstr = new String((Math.round(num*10)/10))
//	if (secstr.includes("."))
//		return secstr
//	else return (secstr += ".0")

	//function normal(){
//	document.getElementById("time").innerHTML = "normal";
//}
//function years(){
//	document.getElementById("time").innerHTML = "years";
//}
//function months(){
//	document.getElementById("time").innerHTML = "month";
//}
//function weeks(){
//	document.getElementById("time").innerHTML = "weeks";
//}
//function days(){
//	document.getElementById("time").innerHTML = "day";
//}
//function hours(){
//	document.getElementById("time").innerHTML = "hr";
//}
//function minutes(){
//	document.getElementById("time").innerHTML = "min";
//}
//function seconds(){
//	document.getElementById("time").innerHTML = "sec";
//}

//else if (l == 18)
//return (num += "00")
//else if (l == 17)
//return (num += "000")
//else if (l == 16)
//return (num += "0000")
//else if (l == 15)
//return (num += "00000")
//else if (l == 14)
//return (num += "000000")
//else if (l == 13)
//return (num += "0000000")
//else if (l == 12)
//return (num += "00000000")
//else if (l == 11)
//return (num += "000000000")
//else if (l == 10)
//return (num += "0000000000")
//else return "err"

//switch (thing) {
//	case "milisec":
//		return num
//	case "seconds":
//		return num
//	case "minutes":
//	case "hours":
//	case "days":
//	case "weeks":
//	case "months":
//	case "years":
//	default: return "err"