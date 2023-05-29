import express from "express";
import User from "../../models/user.js";

const userdata = express.Router();

userdata.post("/handleFav", async (req, res) => {
	let reqbody = JSON.parse(req.body.body);
	let bookObject = reqbody.bookObject;
	let user = await User.findOne({ username: reqbody.username });
	let index = user.favbooks.findIndex((book) => book.link == bookObject.link);
	if (index != -1) {
		console.log("Removed");
		user.favbooks.splice(index, 1);
	} else {
		console.log("Added");
		user.favbooks.push(bookObject);
	}
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
