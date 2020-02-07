var currentask;
var date = "mar 13 2020 21:00:00";
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
var currentyear = date.split(' ')[2];
var monthofdatewanted;
var monthofdatenow;
var strofdatenow;
var strofdatewanted;

window.setTimeout(function setcurrentask() {
	currentask = 8;
	howlong();
},20);

function daysinmonth (monthfordays) {
	return new Date(currentyear, monthfordays, 0).getDate();
};

function getmonthnum(mon){
	var d = Date.parse(mon + "1, " + currentyear);
	if(!isNaN(d)){
	   return new Date(d).getMonth() + 1;
	}
	else {console.log("mon is NaN")};
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
		if (document.getElementById('customdateyear').value.length > 0) {
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
	else  {
		while (month12 > 12) {
			month12 = month12 - 12;
		}
		return month12;
	}
};

function defualtview() {
	var deadline = new Date(date).getTime();
	var now = new Date().getTime();
	var howlongtill = sign*(deadline-now);
	var d = new Date(date);
	var daystillnotimezone = howlongtill/(1000*60*24*60);
	var daystill = daystillnotimezone + ((480 - (d.getTimezoneOffset()))/(60*24));
	var yearstill = 0;
	var monthstill = 0;
	var strofdatenow = new String(new Date());
	// dayofweek , month , day , year
	var strofdatewanted = new String(date);
	// month , day , year
	var monthofdatewanted = getmonthnum(strofdatewanted.split(" ")[0]);
	var monthofdatenow = getmonthnum(strofdatenow.split(" ")[1]);
	// var dayofdatewanted = Number(strofdatewanted.split(" ")[1]);
	// var dayofdatenow = Number(strofdatenow.split(" ")[2]);
	var weekstill = 0;
	
	while (daystill >= 365) {
		yearstill++;
		daystill = daystill - 365;
	};

	if (sign == 1) {
		var whichmonth = monthofdatenow;
	}
	else if (sign == -1) {
		var whichmonth = monthofdatewanted;
	}
	else {console.log("sign is not 1 or -1 how tf")};

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

function howlong() {
	var deadline = new Date(date).getTime();
	var now = new Date().getTime();
	var howlongtill = sign*(deadline-now);
	var d = new Date(date);
	var daystillnotimezone = howlongtill/(1000*60*24*60);
	var daystill = daystillnotimezone + ((480 - (d.getTimezoneOffset()))/(60*24));
	var years = roundscale(daystill/(365.25),"years");
	var months = roundscale(daystill/(30.4375),"months");
	var weeks = roundscale(daystill/(7),"weeks");
	var days = roundscale((daystill),"days");
	var hours = roundscale((daystill*24),"hours");
	var minutes = roundscale((daystill*60*24),"minutes");
	var seconds = roundscale((daystill*1000*60*24),"seconds");
	var milisec = howlongtill;

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

	window.setInterval(function(){
		howlong();
		}, 180);
};

function roundscale (num,thing) {
	switch (thing) {
		case "milisec":
			return addlength(num,0)
		case "seconds":
			return addlength(num,2)
		case "minutes":
			return addlength(num,4)
		case "hours":
			return addlength(num,6)
		case "days":
			return addlength(num,7)
		case "weeks":
			return addlength(num,8)
		case "months":
			return addlength(num,9)
		case "years":
			return addlength(num,10)
		default: console.log("thing not recognized in roundscale");
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