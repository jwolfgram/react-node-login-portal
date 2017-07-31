var cassDB = require("./cassandra_dbs"),
  LocalStrategy = require("passport-local").Strategy;

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    cassDB.authUserByUser(user.username).then((user, err) => {
      done(null, user);
    }).catch((err) => {
      done(err, false);
    })
  });

  passport.use(new LocalStrategy({
    usernameField: "username",
    passwordField: "password"
  }, function(username, password, done) {
    cassDB.authUserByUserAndPass(username, password).then((user, err) => {
      return done(null, user);
    }).catch((err) => {
      done(err, false);
    })
  }));
};
