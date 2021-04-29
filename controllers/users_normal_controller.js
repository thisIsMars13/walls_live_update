const User = require('../models/users');
const client = require('../util/redis');
exports.editProfile = async function (req, res) {
    let id = await client.get('id');
    let data = await User.getUser('users', 'id', id);
    res.status(200).render('profile_page', { data: data[0], errors: req.flash() });
}