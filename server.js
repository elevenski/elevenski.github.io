const Discord = require('discord.js');
const client = new Discord.Client();
const express = require("express");
const app = express();
const path = require("path");

app.use(express.static("public"));
  app.use(
    "/css",
    express.static(path.resolve(__dirname + `/css`))
  );

  app.use(
    "/js",
    express.static(path.resolve(__dirname + `/js`))
  );
  
/*app.get("/", (request, response) => {
  response.sendFile(__dirname + "index.html");
});*/
app.get("/", (request, response) => {
	 var dil = navigator.language || navigator.userLanguage;
    if (dil == "tr-TR"| dil == "tr") {
  response.sendFile(__dirname + "tr.html");
    }
    else {
  response.sendFile(__dirname + "en.html");
    }
});
app.get("/contributors", (request, response) => {
  response.sendFile(__dirname + "contributors.html");
});
app.get("/*", (request, response) => {
  response.sendFile(__dirname + "404.html");
});
