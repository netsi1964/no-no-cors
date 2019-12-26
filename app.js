const request = require("request");
const express = require("express");
const app = express();
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

app.use(function(req, res, next) {
  const host = req.get("host");
  console.log(`Incomming request from: ${host}`);
  if (host.includes(`localhost:${port}`) || host.includes("cdpn.io")) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  }

  next();
});

app.get("/", (req, res) => {
  let { term = "Simon Garfunkel" } = req.query;
  const url = `https://itunes.apple.com/search?term=${term}`;
  console.log(url);
  request(url, (error, response, body) => {
    res.json(response);
  });
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
