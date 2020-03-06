const express = require('express')
const bodyParser = require("body-parser")
const cuki = require('cookie-parser')
const users = require('./routes/router');
const flash = require('flash-express')
const morgan = require('morgan')
const session = require('express-session')
const app = express()
const port = 80



app.set('view engine','ejs') 
app.use(session({
    name: 'ajI0qWzp2QBM1',
    secret: 'secret',
    resave: false,
    saveUninitialized:true,
    cookie: {maxAge: null}
}))
app.use((req, res, next)=>{
    res.locals.message = req.session.message
    delete req.session.message
    next()
})
app.use(bodyParser.json());
app.use(cuki())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
app.use(flash()); 
users(app);

app.listen(port, () => console.log(`port 3000`))
