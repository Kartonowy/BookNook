import express from "express";
import getBooksRouter from "./data/getBookPrices.js";
import auth from "./auth/authenticator.js";
import userdata from "./data/userdata.js";

const router = express.Router();

router.use("/books", getBooksRouter);
router.use("/auth", auth);
router.use("/userdata", userdata);

export default router;
