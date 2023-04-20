import express from 'express';
const app = express();
const port = 5000;

app.listen(port, ()=>{console.log(`Listening on ${port}`)});
app.get('/express_backend', (req, res) => {
    res.send({express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT"})
})