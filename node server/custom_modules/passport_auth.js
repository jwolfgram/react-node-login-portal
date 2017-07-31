var cassDB = require("./cassandra_dbs"),
  LocalStrategy = require("passport-local").Strategy;

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser((user, done) => {
    done(null, null);
  });

  passport.use(new LocalStrategy({
    usernameField: "username",
    passwordField: "password"
  }, function(username, password, done) {
    cassDB.authUserByUserAndPass(username).then((user, err) => {
      return done(null, user);
    }).catch((err) => {
      done(err, false);
    })
  }));
};
