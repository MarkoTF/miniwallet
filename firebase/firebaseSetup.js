const firebase = require('firebase-admin');
const serviceAccount = require('./marcocryptowallet-4d2cb-firebase-adminsdk-1m81u-31900a678c.json')

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});
