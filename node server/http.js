var BASEURL = "/api",
  express = require("express"),
  passport = require("passport"),
  app = express(),
  port = "8092",
  http = require("http").Server(app),
  session = require("express-session"),
  bodyParser = require("body-parser"),
  request = require("request"),
  cookieParser = require("cookie-parser"),
  cookieSession = require("cookie-session");

require("./custom_modules/passport_auth.js")(passport);

app.use(cookieParser());

app.use(cookieSession({
  name: "session",
  keys: [
    "key1", "key2"
  ],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(passport.initialize());
app.use(passport.session());

// app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json())

app.post(`${BASEURL}/auth`, passport.authenticate('local'), function(req, res, next) { //Authenticate endpoint we alwanys want open
  if (req.user) {
    res.send(JSON.stringify(req.user));
    return
  }
  next()
});

app.get(`${BASEURL}/user`, passport.authenticate('local'), (req, res) => {
  res.send(JSON.stringify("req.user"));
});

app.get(`${BASEURL}/logout`, (req, res) => {
  req.logout();
});

http.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});
