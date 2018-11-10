const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports.logout = (req, res) => {
    if (req.session.email) {
        req.session.destroy(() => {
            res.render('user/logout');
        });
    } else {
        res.redirect('/');
    }
}

module.exports.login_get = (req, res) => {
    if (req.session.email) {
        res.redirect('/')
    } else {
        res.render('user/login');
    }
};

module.exports.login_post = (req, res) => {
    const {email, password} = req.body;

    User.findOne({email}, (err, doc) => {
        if (err)
            return res.send(err);

        if (doc) {
            bcrypt.compare(password, doc.password, (err, valid) => {
                if (err)
                    return res.send(err);

                if (valid) {
                    req.session.email = email;
                    res.redirect('/');
                } else {
                    res.render('user/login', {
                        email,
                        error : 'Wrong password!'
                    });
                }
            });
        } else {
            res.render('user/login', {
                error : 'Email not registered!'
            });
        }
    }); 
};

module.exports.register_get = (req, res) => {
    if (req.session.email) {
        res.redirect('/');
    } else {
        res.render('user/register');
    }
};

module.exports.register_post = (req, res) => {
    const {email, password, password2} = req.body;

    if (password !== password2) {
        res.render('user/register', {
            email,
            error : 'Passwords do not match!'
        });
    } else {
        User.findOne({email}, (err, doc) => {
            if (err)
                return res.send(err);

            if (doc) {
                res.render('user/register', {
                    error : 'Email already exists!'
                });
            } else {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err)
                        return res.send(err);

                    const user = new User({
                        email,
                        password : hash
                    });
                
                    user.save((err, doc) => {
                        if (err)
                            return res.send(err);
                            
                        req.session.email = doc.email;
                        res.redirect('/')
                    });
                });
            }
        });
    }    
};
