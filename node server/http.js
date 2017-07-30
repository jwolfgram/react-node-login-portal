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

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);

app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next) {
  //This function is for checking if user logged in through Passport.js
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect(`${BASEURL}/login`);
}

app.get(`${BASEURL}/user`, (req, res) => {
  res.send(JSON.stringify(req.user || false));
});

app.post(
  `${BASEURL}/auth`,
  bodyParser.urlencoded({ extended: false }),
  (req, res, next) => {
    console.log("auth/ local");
    next();
  },
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/"
  })
);

// app.get(
//   `${BASEURL}/auth/callback`,
//   (req, res, next) => {
//     console.log("auth/callback");
//     next();
//   },
//   passport.authenticate("google", {
//     successRedirect: "/oauthPage",
//     failureRedirect: "/oauthPage"
//   })
// );

app.get(`${BASEURL}/logout`, (req, res) => {
  req.logout();
  res.redirect("/");
});

http.listen(port, () => {
  console.log(`Listening on Port:: ${port}`);
});
