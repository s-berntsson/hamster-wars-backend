var admin = require("firebase-admin");

var serviceAccount = require("./secrets/firebase-key-hamster-wars.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});