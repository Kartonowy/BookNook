import * as dotenv from "dotenv";
dotenv.config()
import express from 'express';
import cors from "cors";
import generateResponse from "./scripts/generateResponse.js"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from './models/user.js'

const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json(), urlencodedParser)
app.use(cors());
app.use(express.json());


//connect to mongodb

const dbUrl = `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWIORD}@booknook.i0agglj.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> {
        app.listen(process.env.PORT || 5000, ()=>{
            console.log(`Listening on 5000`)
        });
    })
    .catch((err)=>console.log(err))

app.get('/get-book-prices/:book/', async (req, res) => {
    res.json({ message: await generateResponse(req.params.book) })
})


//Creating user and logging in

app.post("/register", async (req, res) => {
    const user = req.body;
    const takenUsername = await User.findOne({ username: user.username })
    const takenEmail = await User.findOne({ email: user.email })

    if (takenUsername || takenEmail) {
        res.json({ message: "Username or email has already been taken"})
    } else {
        user.password = await bcrypt.hash(req.body.password, 10)

        const dbUser = new User({
            username: user.username.toLowerCase(),
            email: user.email.toLowerCase(),
            password: user.password
        })

        dbUser.save()
        res.json({ message: "Success"})
    }
})

//Logging

app.post("/login", (req, res) => {

    const userLoggingIn = req.body;

    User.findOne({ username: userLoggingIn.username })
        .then(dbUser => {
            if (!dbUser) {
                return res.json({ message: "Invalid username or password"})
            }
            bcrypt.compare(userLoggingIn.password, dbUser.password)
                .then(isCorrect => {
                    if (isCorrect) {
                        const payload = {
                            id: dbUser._id,
                            username: dbUser.username,
                        }
                        jwt.sign(
                            payload,
                            process.env.JWT_SECRET,
                            {expiresIn: 86400},
                            (err, token) => {
                                if (err) return res.json({ message: err})
                                return res.json({
                                    message: "Success",
                                    token: "Bearer " + token
                                })
                            }
                        )
                    } else {
                        return res.json({ message:"Invalid username or password"})
                    }
                })
        })
})

//Verify that user has required permissions

function verifyJWT(req, res, next) {
    const token = req.headers["x-access-token"]?.split(' ')[1]

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err,decoded) => {
            if (err) return res.json({
                isLoggedIn: false,
                message: "Failed to verify"
            })
            req.user = {};
            req.user.id = decoded.id;
            req.user.username = decoded.username;
            next()
        })
    } else {
        res.json({message: "Incorrect token given", isLoggedIn: false})
    }
}