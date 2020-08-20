const router = require('express').Router();
const reminder = require('../models/reminder.model');

router.post('/', (req, res) => {
	const userData = { title, description } = req.body
	console.log(userData)
		const account = new reminder ({ title, description })
		account.save()
			.then(() => res.json({msg: 'Reminder taken'}))
			.catch(err => res.status(400).json(err))
	})

module.exports = router;