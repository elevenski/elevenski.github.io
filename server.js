const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "index.html");
});
app.get("/*", (request, response) => {
  response.sendFile(__dirname + "404.html");
});
