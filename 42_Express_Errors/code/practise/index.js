AppError = require('./AppError')

express = require('express')
app = express()
morgan = require('morgan')


// app.use((req,res,next)=>{
//     console.log("this is my first middleware")
//     next()
// })
// app.use(morgan('tiny'))
// app.use((req, res, next) => {
//     console.log(req.method.toUpperCase(), req.path)
//     next()
// })

verifyPassword = ((req, res, next) => {
    const { password } = req.query
    if (password === 'chickennugget') {
        next()
    }
    // res.send('Sorry you need a password')
    res.status(401) // unauthorized 
    throw new AppError('Password required', 401)

})

app.get('/error', (req, res) => {
    chicken.fly()
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

// we have to put it at last
// app.use((err,req,res,next)=>{
//     console.log("***************************************")
//     console.log("****************ERROR****************")
//     console.log("***************************************")
// console.log(err);
// next(err)
// res.statusS(500).send("Oh boy we got an error")
// })

app.get('/admin',(req,res)=>{
    throw new AppError('you are not an Admin',403)
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'something went wrong' } = err;
    res.status(status).send(message)
})

app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})