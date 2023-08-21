// imports
const express = require('express');
const route = express.Router();
// import controllers
const userController = require('../controller/UsersController');

const checkSession = (req, res, next)=>{
    if(req.session.username){
        res.redirect('/product?msg=true');
    }else{
        next();
    }
}

// routes
route.get('/login', checkSession, userController.loginForm);
route.post('/login', userController.login);
route.get('/logout', userController.logout);

// export
module.exports = route;