import express from 'express';
import cors from "cors";
import generateResponse from "./scripts/generateResponse.js"

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/get-book-prices/:book/', async (req, res) => {
    res.json({ book: await generateResponse(req.params.book) })
})

app.listen(port, ()=>{
    console.log(`Listening on ${port}`)
});
