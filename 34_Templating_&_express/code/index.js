express = require('express')
app = express()
path = require('path')
redditData = require('./data.json')

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/cats', (req, res) => {
    cats = ['Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston']
    res.render('cats', { allCats: cats })
})
app.get('/random', (req, res) => {
    num = Math.floor(Math.random() * 10) + 1
    res.render('random', { random: num })
})
app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    data = redditData[subreddit]
    if (data) {
        res.render('subreddit', { ...data })
    } else {
        res.render('notFound', { subreddit })
    }
})
app.listen(3000, () => {
    console.log("Listening on port 3000");
})