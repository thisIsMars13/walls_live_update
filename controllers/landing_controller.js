const client = require('../util/redis')

exports.landing = function (req, res) {
    res.status(200).render('index', req.flash());
}

exports.sign_in = function (req, res) {
    res.status(200).render('signin_page', req.flash());
}

exports.register = function (req, res) {
    res.status(200).render('register_page', req.flash());
}

exports.logout = function (req, res) {
    client.flush();
    res.redirect('/');
}
