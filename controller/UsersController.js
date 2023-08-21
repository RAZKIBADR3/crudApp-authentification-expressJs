const userModel = require('../model/user');

const index = (req, res) => {
    res.render('users/index', {
        title: 'users'
    })
}

const loginForm = (req, res) => {
    res.render('users/login', {
        title: 'login'
    })
}

const login = async (req, res) => {
    // const user = req.body;
    const users = await userModel.getOne(req.body.username, req.body.password);
    if(users.length > 0 ){
        req.session.username = users[0].username;
        res.redirect('/product');
    }else{
        res.render('users/login', {
            title: 'login',
            msg: 'password is wrong'
        })
    }
}

const logout = (req, res) => {
    console.log('logout');
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Server error');
        }
        res.redirect('/user/login');
    });
}

module.exports = {index, loginForm, login, logout}