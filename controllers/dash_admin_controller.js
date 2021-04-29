const User = require('../models/users');

exports.viewDashAdmin = async function (req, res) {
    let data = await User.getAllusers('users');
    res.status(200).render('dash_admin', { data });
}

exports.addNew = async function (req, res) {
    res.status(200).render('new_user', req.flash());
}

exports.editAdmin = async function (req, res) {
    let data = await User.getUser('users', ['id'], req.params.id);
    res.status(200).render('edit_page', { data: data[0], notification: req.flash() });
}