var cassDB = require("./cassandra_dbs"),
  LocalStrategy = require("passport-local").Strategy;

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    // db.User.findById(id, (err, user) => {
    //   done(err, user);
    // });
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, done) {
        process.nextTick(() => {
          // db.User.findOne({ "local.username": email }, function(err, user) {
          //   if (err) return done(err);
          //   if (user) {
          //     return done(
          //       null,
          //       false,
          //       req.flash("signupMessage", "That email already taken")
          //     );
          //   } else {
          //     var newUser = new db.User();
          //     newUser.local.username = email;
          //     newUser.local.password = newUser.generateHash(password);
          //
          //     newUser.save(function(err) {
          //       if (err) throw err;
          //       return done(null, newUser);
          //     });
          //   }
          // });
        });
      }
    )
  );

  passport.use(
    new LocalStrategy(function(username, password, done) {
      //username can be either the username or the users email address, need to check for both
      // db.User.findOne({ "local.username": username }, function(err, user) {
      //   if (err) {
      //     throw err;
      //   }
      //   if (user) return done(null, user);
      //   else {
      //     //Return account found in database
      //     //Make new account for user based on info obtained from Google User Account data
      //     var newUser = new db.User();
      //     newUser.google.id = profile.id;
      //     newUser.google.token = accessToken;
      //     newUser.google.name = profile.displayName;
      //     newUser.google.email = profile.emails[0].value;
      //
      //     newUser.save(function(err) {
      //       if (err) throw err;
      //       return done(null, newUser);
      //     });
      //     console.log(profile);
      //   }
      // });
    })
  );

  passport.use(
    new LocalStrategy(
      { usernameField: "username", passwordField: "password" },
      function(username, password, done) {
        // db.Account.find({ username: username }, function(err, docs) {
        //   if (docs.length === 0) {
        //     return done(err);
        //   } else {
        //     if (docs[0].password === password) {
        //       console.log("Verified password matches user");
        //       return done(null, username);
        //     } else {
        //       console.log("Could not verify password was correct");
        //       return done(null, false, { message: "Incorrect Login." });
        //     }
        //   }
        // });
      }
    )
  );
};
