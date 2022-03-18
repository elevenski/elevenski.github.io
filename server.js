const express = require("express");
const app = express();
const path = require("path");

app.use(express.static("public"));
  /*app.use(
    "/css",
    express.static(path.resolve(__dirname + `/css`))
  );

  app.use(
    "/js",
    express.static(path.resolve(__dirname + `/js`))
  );*/

app.get("/*", (req, res) => {
  res.send("404 Not Found")
});
