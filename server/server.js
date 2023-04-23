import express from 'express';
import cors from "cors";
import generateResponse from "./scripts/generateResponse.js"

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/express_backend/:book/', async (req, res) => {
    res.json({ express: await generateResponse(req.params.book) })
})

app.listen(port, ()=>{
    console.log(`Listening on ${port}`)
});
