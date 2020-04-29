const router = require("express").Router();


router.get('/', async (req, res, next) => {
	let member = await req.member.get()

	let finalData = [];

	member.forEach(doc => {
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
