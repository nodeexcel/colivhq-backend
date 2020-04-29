const router = require("express").Router();


router.get('/getHome', async (req, res, next) => {
	let home = await req.home.get()

	let finalData = [];

	home.forEach(doc => {
		finalData.push({
			id: doc.id,
			...doc.data()
		})
	});
	res.send({
		data: finalData
	});
})
module.exports = router
