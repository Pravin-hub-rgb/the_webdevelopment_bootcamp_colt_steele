express = require('express')
app = express()
morgan = require('morgan')

// app.use((req,res,next)=>{
//     console.log("this is my first middleware");
//     next()
// })
// app.use(morgan('tiny'))
// app.use((req, res, next) => {
//     console.log(req.method.toUpperCase(), req.path);
//     next()
// })

verifyPassword = ((req, res, next) => {
    const { password } = req.query
    if (password === 'chickennugget') {
        next()
    }else{
        res.send('Sorry you need a password')
    }
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('My Secret : Sometime I wear headphones in public so I dont have to talk to anyone')
})
app.get('/', (req, res) => {
    res.send('Home Page')
})
app.get('/dogs', (req, res) => {
    res.send('Woof Woof')
})


app.listen(3000, () => {
    console.log('App is running on localhost:3000');
})