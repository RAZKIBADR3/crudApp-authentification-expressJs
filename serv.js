// imports
const express = require('express');
const app = express();
const session = require('express-session');

// settings
app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(express.urlencoded({extended:false}));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}))

// routes
const checkSession = (req, res, next)=>{
    if(req.session.username){
        next();
    }else{
        res.redirect('/user/login');
    }
}

// import routes
const productRoute = require('./routes/product');
const userRoute = require('./routes/user');

app.use("/product", checkSession, productRoute);
app.use("/user", userRoute);
app.use(checkSession);

// server
app.listen(8000, () => {
    console.log('Server listening on port 8000');
});
