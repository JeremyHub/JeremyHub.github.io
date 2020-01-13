var currentask;

function settask (val) {
	currentask = val;
}

function roundscale (num,thing) {
//	var str = new String(num);
//	var l = str.length
//	switch (thing) {
//		case "milisec":
//		case "seconds":
//		case "minutes":
//		case "hours":
//		case "days":
//		case "weeks":
//		case "months":
//		case "years":
//			var diff = 20-l;
//			var addzero = new String("");
//			
//		default: return "err"	
return num
	}

function howlong(){
	var deadline = new Date("mar 15, 2020 18:00:00").getTime();
	var now = new Date().getTime();
	var howlongtill = deadline-now;
	var years = roundscale(howlongtill/(1000*60*60*24*7*30*12),"years");
	var months = roundscale(howlongtill/(1000*60*60*24*7*30),"months");
	var weeks = roundscale(howlongtill/(1000*60*60*24*7),"weeks");
	var days = roundscale(howlongtill/(1000*60*60*24),"days");
	var hours = roundscale(howlongtill/(1000*60*60),"hours");
	var minutes = roundscale(howlongtill/(1000*60),"minutes");
	var seconds = roundscale(howlongtill/(1000),"seconds");
	var milisec = roundscale(howlongtill,"milisec");
	
	if (currentask == 0) {
		document.getElementById("time").innerHTML = milisec;
	}
	else if (currentask == 1) {
		document.getElementById("time").innerHTML = years;
	}
	else if (currentask == 2) {
		document.getElementById("time").innerHTML = months;
	}
	else if (currentask == 3) {
		document.getElementById("time").innerHTML = weeks;
	}
	else if (currentask == 4) {
		document.getElementById("time").innerHTML = days;
	}
	else if (currentask == 5) {
		document.getElementById("time").innerHTML = hours;
	}
	else if (currentask == 6) {
		document.getElementById("time").innerHTML = minutes;
	}
	else if (currentask == 7) {
		document.getElementById("time").innerHTML = seconds;
	}
	else {
	console.log("ERROR");

	window.setInterval(function(){
		howlong();
		}, 100);
	}}

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