import express from "express";
import User from "../../models/user.js";

const userdata = express.Router();

userdata.post("/sendFavBook", async (req, res) => {
	let reqbody = JSON.parse(req.body.body);
	let bookObject = reqbody.bookObject;
	let user = await User.findOne({ username: reqbody.username });
	user.favbooks.push(bookObject);
	user.save();
	res.json({ message: "Success" });
});

userdata.post("/retrieveFavBooks", async (req, res) => {
	let reqbody = JSON.parse(req.body.body);
	let user = await User.findOne({ username: reqbody.username });
	res.json({ favbooks: user.favbooks });
});

userdata.post("/updateSearchAmount", async (req, res) => {
	let reqbody = JSON.parse(req.body.body);
	let user = await User.findOne({ username: reqbody.username });
	if (user) {
		user.searchAmount += 1;
		user.save();
	}
	res.json({ message: "Success" });
});

userdata.post("/getUserStats", async (req, res) => {
	let reqbody = JSON.parse(req.body.body);
	let user = await User.findOne({ username: reqbody.username });
	res.json({
		favbooksAmount: user.favbooks.length,
		searchAmount: user.searchAmount,
	});
});

export default userdata;
