const Discord = require('discord.js');
const client = new Discord.Client();
const express = require("express");
const app = express();
const path = require("path");

var settings_india = {
	"async": true,
	"crossDomain": true,
	"url": "https://api.covid19india.org/data.json",
	"method": "GET"
}

var settings_world = {
	"async": true,
	"crossDomain": true,
	"url": "https://corona.lmao.ninja/v2/all?yesterday=true",
	"method": "GET"
}

$.ajax(settings_india).done(function (response) {
	console.log(response);
	document.getElementById("total_counter_india").textContent=JSON.parse(JSON.stringify(response.statewise[0].confirmed));
	document.getElementById("last_updated").textContent=JSON.parse(JSON.stringify(response.statewise[0].lastupdatedtime));
	document.getElementById("new_cases_today").textContent=JSON.parse(JSON.stringify(response.statewise[0].deltaconfirmed));
	document.getElementById("total_active_cases").textContent=JSON.parse(JSON.stringify(response.statewise[0].active));
	document.getElementById("total_recovered_cases").textContent=JSON.parse(JSON.stringify(response.statewise[0].recovered));
	document.getElementById("total_deaths").textContent=JSON.parse(JSON.stringify(response.statewise[0].deaths));
	var states=document.getElementsByClassName("state");
	var total = document.getElementsByClassName("total");
	var nct = document.getElementsByClassName("new-cases-today");
	var active = document.getElementsByClassName("active");
	var recovered = document.getElementsByClassName("recovered");
	var deaths = document.getElementsByClassName("deaths");
	var ltu = document.getElementsByClassName("last-updated");
	for (var i = 0; i < 37; i++) {
		states[i].textContent=JSON.parse(JSON.stringify(response.statewise[i+1].state));
	}
	for (var i = 0; i < 37; i++) {
		total[i].textContent=JSON.parse(JSON.stringify(response.statewise[i+1].confirmed));
	}
	for (var i = 0; i < 37; i++) {
		nct[i].textContent=JSON.parse(JSON.stringify(response.statewise[i+1].deltaconfirmed));
	}
	for (var i = 0; i < 37; i++) {
		active[i].textContent=JSON.parse(JSON.stringify(response.statewise[i+1].active));
	}
	for (var i = 0; i < 37; i++) {
		recovered[i].textContent=JSON.parse(JSON.stringify(response.statewise[i+1].recovered));
	}
	for (var i = 0; i < 37; i++) {
		deaths[i].textContent=JSON.parse(JSON.stringify(response.statewise[i+1].deaths));
	}
	for (var i = 0; i < 37; i++) {
		ltu[i].textContent=JSON.parse(JSON.stringify(response.statewise[i+1].lastupdatedtime));
	}
});

$.ajax(settings_world).done(function (response) {
	document.getElementById("total_counter_world").textContent=JSON.parse(JSON.stringify(response.cases))
})

app.use(express.static("public"));
  app.use(
    "/css",
    express.static(path.resolve(__dirname + `/css`))
  );

  app.use(
    "/js",
    express.static(path.resolve(__dirname + `/js`))
  );

app.get("/*", (request, response) => {
  response.sendFile(__dirname + "404.html");
});
