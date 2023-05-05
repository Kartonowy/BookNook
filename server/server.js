import * as dotenv from "dotenv";
dotenv.config()
import express from 'express';
import cors from "cors";
import generateResponse from "./scripts/generateResponse.js"
import bodyParser from "body-parser";
import mongoose from "mongoose";


const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json(), urlencodedParser)
app.use(cors());
app.use(express.json());

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


