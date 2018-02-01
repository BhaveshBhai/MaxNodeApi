var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cate-c7924.firebaseio.com",
});
console.log('Firebase Admin Initialized');
module.exports.admin = admin;
