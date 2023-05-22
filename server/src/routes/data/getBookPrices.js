import express from "express";
import generateResponse from "../../scripts/generateResponse.js";

const getBooksRouter = express.Router();

getBooksRouter.get("/getBookPrices/:book/", async (req, res) => {
	res.json({ message: await generateResponse(req.params.book) });
});

export default getBooksRouter;
