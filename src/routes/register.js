const router = require("express").Router();
const bcrypt = require('bcrypt');
const user = require("../models/user.model");

router.post("/", (req, res) => {
	const userData = ({ username, email, password, passwordVal } = req.body);
	validator(userData)
		.then(result => {
			const account = new user({ username, email, password: passHash });
			account.save()
				.then(() => res.json({msg: 'User Registered'}))
				 .catch(err => console.log(err))
		})
		.catch((err) => {
			//err returns the rejected reason message specified in the validators
			console.log(err)
			res.status(500).json(err);
		});
});

validator = async (e) => {
	//anything below each await statement is added to a 'microtask' queue
	//executes each function in a sequence, returns promise values from functions
	await fieldValidator(e);
	await emailValidator(e.email);
	await queryAccount(e);
	await passwordValidator(e);
	await passwordHash(e.password)
	return e;
};

fieldValidator = (e) => {
	//puts the object values into an array
	let arr = Object.values(e);
	const proms = [];
	//loops through array and checks if they are empty
	for (let i = 0; i < arr.length; i++) {
		//push functions into the 'proms' array
		proms.push(
			() =>
				new Promise((resolve, reject) => {
					//if a parsed argument is empty, revoke
					if (arr[i] === "") {
						reject({
							msg: "Missing Fields",
							field: i,
						});
					} else {
						resolve({ msg: i + ". Field filled" });
					}
				})
		);
	}
	//returns a promise value for each looped field
	const arrOfProms = proms.map((prom) => prom());
	//returns a promise state
	return Promise.all(arrOfProms);
};

queryAccount = (e) => {
	//return a promise value based on the corresponding value passed in
	return new Promise((resolve, reject) => {
		//query user database with the parsed values for the relevant account
		user.findOne(
			{
				$or: [
					{
						username: {
							$regex: e.username,
						},
					},
					{
						email: {
							$regex: e.email,
						},
					},
				],
			},
			(err, obj) => {
				//findOne parses account object or a "null" response if the query fails
				//compares the parsed object username and email with req.body request data
				if (obj === null) {
					resolve({ msg: "User doesnt exist" });
				} else if (e.username === obj.username) {
					reject({ msg: "User already exists" });
				} else if (e.email === obj.email) {
					reject({ msg: "Email is already registered" });
				}
			}
		);
	});
};

emailValidator = (e) => {
	//return a promise value based on the corresponding value passed in
	return new Promise((resolve, reject) => {
		//checks that both "@" and "." are within the parsed argument
		if (e.includes("@", ".") === true) {
			resolve({ msg: "Correct email format" });
		} else {
			reject({ msg: "Incorrect email format" });
		}
	});
};

passwordValidator = (e) => {
	let prom1 = new Promise((resolve, reject) => {
		if (e.password.length < 6) {
			reject({ msg: "Password must be longer then 5 characters" });
		} else {
			resolve({ msg: "Password length valid" });
		}
	});

	let prom2 = new Promise((resolve, reject) => {
		if (e.password !== e.passwordVal) {
			reject({ msg: "Passwords don't match" });
		} else {
			resolve({ msg: "Passwords match" });
		}
	});
	//returns a promise state
	return Promise.all([prom1, prom2]);
};

passwordHash = async (e) => {
	//generate a salt and hash the plain password
	const salt = await bcrypt.genSalt();
	return (passHash = await bcrypt.hash(e, salt).then((res) => {
		return res;
	}));
};

module.exports = router;