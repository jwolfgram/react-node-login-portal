var cassandra = require("cassandra-driver"),
  PlainTextAuthProvider = cassandra.auth.PlainTextAuthProvider;

cassandraClient = new cassandra.Client({
  contactPoints: ["127.0.0.1"],
  keyspace: "maidbot",
  authProvider: new PlainTextAuthProvider("maidbot", "maidbot1234")
});

cassandraClient.connect(err => {
  if (err) {
    try {
      throw new Error(`Cassandra: ${err.message}`);
    } catch (e) {
      console.log(err.message);
    }
    return;
  }
  console.log("Cassandra Connected");
});

exports.listAllUsers = () => {
  return new Promise((resolve, reject) => {
    cassandraClient.eachRow("SELECT * FROM users", [], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.addNewUser = (username, password, message) => {
  return new Promise((resolve, reject) => {
    cassandraClient.execute("INSERT INTO users(username, password, message) VALUES(?,?,?)", [
      username, password, message
    ], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

// Search by username filter

exports.authUserByUserAndPass = username => {
  return new Promise((resolve, reject) => {
    cassandraClient.execute("SELECT * FROM users WHERE username=?", [username], (err, result) => {
      if (err) {
        reject(err);
      } else {
        let user = result.first();
        delete user.password
        resolve(user);
      }
    });
  });
};
