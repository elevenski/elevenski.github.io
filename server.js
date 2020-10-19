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
  
app.get("/", (request, response) => {
  response.sendFile(__dirname + "pages/index.html");
});
app.get("/contributors", (request, response) => {
  response.sendFile(__dirname + "pages/contributors.html");
});
app.get("/*", (request, response) => {
  response.sendFile(__dirname + "pages/404.html");
});
