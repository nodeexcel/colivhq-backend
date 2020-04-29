const functions = require('firebase-functions');
const admin = require("firebase-admin");
const cors = require("cors")
const express = require("express")
const bodyParser = require('body-parser');
const routes = require('./routes');
const serviceAccount = require('./colivhq.json')
/* Express with CORS */
const app = express()

app.use(express.json({
	limit: '500mb',
	extended: true
}))
app.use(bodyParser.urlencoded({
	limit: '500mb',
	parameterLimit: 50000,
	extended: true,
}));

app.use(cors({
	origin: true
}))
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://colivhq-backend.firebaseio.com"
});
admin.firestore().settings({
	timestampsInSnapshots: true
})
app.use('*', async (req, res, next) => {
	try {
		req.home = admin.firestore().collection('homes');
		req.member = admin.firestore().collection('members');
		return next()
	} catch (error) {
		return res.status(400).send(error)
	}
})

app.use("/", routes)

const api = functions.https.onRequest(app)

module.exports = {
	api
}
