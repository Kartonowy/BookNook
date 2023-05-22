import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import User from "../../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const auth = express.Router();

function verifyJWT(req, res, next) {
	const token = req.headers["x-access-token"]?.split(" ")[1];

	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err)
				return res.json({
					isLoggedIn: false,
					message: "Failed to verify",
				});
			req.user = {};
			req.user.id = decoded.id;
			req.user.username = decoded.username;
			next();
		});
	} else {
		res.json({ message: "Incorrect token given", isLoggedIn: false });
	}
}

auth.post("/register", async (req, res) => {
	const user = JSON.parse(req.body.body);
	const takenUsername = await User.findOne({ username: user.username });
	const takenEmail = await User.findOne({ email: user.email });
	req.body.body = JSON.parse(req.body.body);
	if (takenUsername || takenEmail) {
		res.json({ message: "Username or email has already been taken" });
	} else {
		let salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(req.body.body.password, salt);

		const dbUser = new User({
			username: user.username,
			email: user.email.toLowerCase(),
			password: user.password,
		});

		await dbUser.save();
		res.json({ message: "Success" });
	}
});

auth.post("/login", (req, res) => {
	const userLoggingIn = JSON.parse(req.body.body);
	req.body.body = JSON.parse(req.body.body);
	User.findOne({ username: userLoggingIn.username }).then((dbUser) => {
		if (!dbUser) {
			return res.json({ message: "Invalid username or password" });
		}
		bcrypt
			.compare(userLoggingIn.password, dbUser.password)
			.then((isCorrect) => {
				if (isCorrect) {
					const payload = {
						id: dbUser._id,
						username: dbUser.username,
					};
					jwt.sign(
						payload,
						process.env.JWT_SECRET,
						{ expiresIn: 86400 },
						(err, token) => {
							if (err) return res.json({ message: err });
							return res.json({
								message: "Success",
								loggedIn: true,
								token: "Bearer " + token,
								username: dbUser.username,
								searchAmount: dbUser.searchAmount,
							});
						}
					);
				} else {
					return res.json({ message: "Invalid username or password" });
				}
			});
	});
});

auth.get("/isUserAuth", verifyJWT, (req, res) => {
	res.json({ isLoggedIn: true, username: req.user.username });
});

export default auth;
