module.exports = (req, res) => {
    if (req.session.email) {
        res.render('index', {
            email : req.session.email
        });
    } else {
        res.redirect('/user/register');
    }
};