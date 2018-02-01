var admin = require("firebase-admin");
var serviceAccount = require("./captoore-firebase-adminsdk-qkvs2-309af7e476.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://captoore.firebaseio.com",
});
console.log('Firebase Admin Initialized');
module.exports.admin = admin;
