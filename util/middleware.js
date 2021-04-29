const client = require('./redis')

exports.onLanding = async function (req, res, next) {
    let datas = await client.get("id")
    if (datas !== null) {
        res.redirect('/dashboard');
    }
    else {
        next();
    }
}
exports.onDashboard = async function (req, res, next) {
    let datas = await client.get("id")
    if (datas === null) {
        req.flash('error', "You need to be logged in to view this page!")
        res.redirect('/');
    }
    else {
        next();
    }
}

exports.isADmin = async function (req, res, next) {
    let user_level = await client.get('user_level');
    if (user_level == 1) {
        next();
    }
    else {
        res.redirect('/dashboard');
    }
}

exports.isNormal = async function (req, res, next) {
    let user_level = await client.get('user_level');
    if (user_level == 1) {
        res.redirect('/dashboard/admin');
    }
    else {
        next();
    }
}