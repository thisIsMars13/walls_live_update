const client = require('../util/redis');
const User = require('../models/users');

exports.viewDash = async function (req, res) {
    let data = await User.getAllusers('users');
    res.status(200).render('dash_normal', { data });
}

