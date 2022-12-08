const express = require('express');
const app = express()
const routes = require('./routes')
const session = require('express-session')
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        sameSite: true
    }
}))

app.get('/', (req, res) => {
    res.redirect('/login')
})
app.use('/', routes)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})