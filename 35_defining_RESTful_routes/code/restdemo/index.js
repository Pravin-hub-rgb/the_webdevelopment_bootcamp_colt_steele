
express = require('express')
app = express()
path = require('path')
const { v4: uuidv4 } = require('uuid');
methodOverride = require('method-override')


app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

// NEW 
app.get('/comments/new', (req, res) => {
    res.render('comments/new', { comments })
})
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ id:uuidv4(),username, comment })
    res.redirect('/comments')
})

// SHOW 
app.get('/comments/:id', (req, res) => {
    id = req.params.id
    comments.find(c => {
        if (c.id === id) {
            res.render('comments/show', { c })
        }
    })
})
// EDIT 
app.get('/comments/:id/edit', (req, res) => {
    id = req.params.id
    comments.find(c => {
        if (c.id === id) {
            res.render('comments/edit', { c })
        }
    })
})
app.patch('/comments/:id', (req, res) => {
    const { username, comment } = req.body
    id = req.params.id
    comments.find(c => {
        if (c.id === id) {
            c.username = username
            c.comment = comment
        }
    })
    res.redirect(`/comments/${id}`)
})

// DELETE 
app.delete('/comments/:id', (req, res) => {
    id = req.params.id
    comments = comments.filter(c=>c.id!=id)
    res.redirect('/comments')
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})

comments = [
    {
        id: uuidv4(),
        username: 'Todd',
        comment: 'lol that is so funny'
    },
    {
        id: uuidv4(),
        username: 'Skyler',
        comment: 'I like to go fishing'
    },
    {
        id: uuidv4(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuidv4(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]