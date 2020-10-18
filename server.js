const Discord = require('discord.js');
const client = new Discord.Client();
const express = require("express");
const app = express();
const path = require("path");

const renderTemplate = (res, req, template, data = {}) => {
const baseData = {
bot: client,
path: req.path,
client: client,
};
res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
};

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
  response.sendFile(__dirname + "index.html");
});
app.get("/contributors", (request, response) => {
  response.sendFile(__dirname + "contributors.ejs");
});
app.get("/*", (request, response) => {
  response.sendFile(__dirname + "404.html");
});
