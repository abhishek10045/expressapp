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
        if (err) {
            throw new Error(err);
        }

        if (doc) {
            if (doc.password === password) {
                req.session.email = email;
                res.redirect('/');
            } else {
                res.render('user/login', {
                    email,
                    error : 'Wrong password!'
                });
            }
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
        return res.render('user/register', {
            email,
            error : 'Passwords do not match!'
        });
    }

    User.findOne({email}, (err, doc) => {
        if (err) {
            throw new Error(err);
        }

        if (doc) {
            res.render('user/register', {
                error : 'Email already exists!'
            });
        } else {
            const user = new User({
                email,
                password
            });
        
            user.save((err, doc) => {
                if (err)
                    throw new Error(err);
            });

            req.session.email = email;
            res.redirect('/')
        }
    });    
};
