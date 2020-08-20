const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user = require("../models/user.model");

router.post("/", (req, res) => {
	const userData = ({ username, password } = req.body);
	login(userData)
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

login = async (e) => {
	await fieldValidator(e);
	userObj = await queryAccountReturnObj(e.username);
	await passwordMatch(e.password, userObj);
	return await jwtToken(userObj);
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

queryAccountReturnObj = (e) => {
	//return a promise value based on the corresponding value passed in
	return new Promise((resolve, reject) => {
		//query user database with the parsed values for the relevant account
		return user.findOne(
			{
				$or: [
					{
						username: {
							$regex: e,
						},
					},
					{
						email: {
							$regex: e,
						},
					},
				],
			},
			(err, obj) => {
				//findOne parses account object or a "null" response if the query fails
				//compares the parsed object username and email with req.body request data
				if (obj === null || obj === undefined) {
					reject({ msg: "User doesn't exist" });
				} else if (e === obj.username || e === obj.email) {
					resolve(obj);
				} else {
					reject({ msg: "Invalid Credentials" });
				}
			}
		);
	});
};

passwordMatch = (...args) => {
	return new Promise(async (resolve, reject) => {
		//compares the hashed password with the user password request
		res = await bcrypt.compare(args[0], args[1].password);
		if (!res) {
			reject({ msg: "Incorrect credentials" });
		} else {
			resolve({ msg: "Authenticated successfully" });
		}
	});
};
wtToken = (e) => {
	return new Promise(async (resolve, reject) => {
		//creates a token, based on the user mongo id and assign the value to a variable
		//encodes the account id with a time signature
		//the 'JWT_SECRET' reference is a randomised string of characters that is used to authenticate requests to the backend
		const token = jwt.sign({ id: e._id }, process.env.JWT_SECRET);
		resolve({
			token,
			user: { id: e._id, email: e.email },
		});
	});
};

module.exports = router;
