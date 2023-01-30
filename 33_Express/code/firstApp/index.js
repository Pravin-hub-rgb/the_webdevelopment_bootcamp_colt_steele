express = require('express')
app = express()
port = 3000

app.get('/', (req, res) => {
    res.send('This is the Homepage!')
})

app.get('/r/:subreddit', (req, res) => {
   const  { subreddit }=req.params
    res.send(`<h1>Browsing the "${subreddit}" subreddit</h1>`)
    console.log(req.params);
})
// query demo
app.get('/search',(req,res)=>{
    const {q}=req.query
    res.send(`You are looking for ${q}`)
})

app.listen(port, () => {
    console.log("Listening on port 3000");
})