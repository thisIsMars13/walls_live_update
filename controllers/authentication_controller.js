const User = require('../models/users');
const validator = require('../util/validator');
const bcrypt = require('bcrypt');
const client = require('../util/redis');

exports.signin = async function (req, res) {
    let user = await User.getUser('users', 'email', req.body.email);
    let match = await bcrypt.compare(req.body.password, user[0].password);
    if (user.length > 0 && match) {
        client.setExpiration('id', 3600, user[0].id);
        client.setExpiration('user_level', 3600, user[0].user_level);
        if (user[0].user_level == 1) {
            res.redirect('/dashboard/admin');
        }
        else {
            res.redirect('/dashboard');
        }
    }
    else {
        req.flash('login', "Invalid Email or Password");
        res.redirect('/signin');
    }

}

exports.register_user = async function (req, res) {
    let validate = await validator.register(req.body);
    if (validate != true) {
        req.flash('registration', validate);
        res.redirect('/register');
    }
    else {
        let isAdmin = await User.getUser('users', 'user_level', '1');
        let user_level = (isAdmin.length > 0) ? '0' : '1';
        let password = await bcrypt.hash(req.body.password, 10);
        const column = [
            'first_name',
            'last_name',
            'email',
            'password',
            'user_level'
        ]
        let data = [
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            password,
            user_level
        ];

        let result = await User.addUser('users', column, data);
        if (result) {
            req.flash('success', "Registration successful");
            res.redirect('/register');
        }
    }
}

exports.editInfo = async function (req, res) {
    let validate = await validator.validateInfo(req.body);
    if (validate != true) {
        req.flash('info_update', validate);
        res.redirect('/users/edit');
    }
    else {
        let id = await client.get('id');
        let columns = [
            'email',
            'first_name',
            'last_name'
        ]
        let data = [
            req.body.email,
            req.body.first_name,
            req.body.last_name,
            id
        ]
        await User.updateUserInfo('users', columns, 'id = ?', data);
        req.flash('info_updated', 'Information successfully updated');
        res.redirect('/users/edit');
    }
}

exports.editPassword = async function (req, res) {
    let validate = validator.validatePassword(req.body);
    if (validate != true) {
        req.flash('password_update', validate);
        res.redirect('/users/edit');
    }
    else {
        let password = await bcrypt.hash(req.body.password, 10);
        let id = await client.get('id');
        let columns = [
            'password',
        ]
        let data = [
            password,
            id
        ]
        await User.updateUserInfo('users', columns, 'id = ?', data);
        req.flash('password_updated', 'Password successfully updated');
        res.redirect('/users/edit');
    }
}
exports.editDescription = async function (req, res) {
    let id = await client.get('id');
    let columns = [
        'description',
    ]
    let data = [
        req.body.description,
        id
    ]
    await User.update_user_info('users', columns, 'id = ?', data);
    req.flash('description_updated', 'Description successfully updated');
    res.redirect('/users/edit');
}

exports.addUser = async function (req, res) {
    let validate = await validator.register(req.body);
    if (validate != true) {
        req.flash('registration', validate);
        res.redirect('/users/new');
    }
    else {
        let isAdmin = await User.getUser('users', 'user_level', '1');
        let user_level = (isAdmin.length > 0) ? '0' : '1';
        let password = await bcrypt.hash(req.body.password, 10);
        const column = [
            'first_name',
            'last_name',
            'email',
            'password',
            'user_level'
        ]
        let data = [
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            password,
            user_level
        ];

        let result = await User.addUser('users', column, data);
        if (result) {
            req.flash('success', "Registration successful");
            res.redirect('/users/new');
        }
    }
}

exports.editInfoAdmin = async function (req, res) {
    let validate = await validator.validateInfo(req.body);
    if (validate != true) {
        req.flash('info_update', validate);
        res.redirect(`/users/edit/${req.params.id}`);
    }
    else {
        let columns = [
            'email',
            'first_name',
            'last_name',
            'user_level'
        ]
        let data = [
            req.body.email,
            req.body.first_name,
            req.body.last_name,
            req.body.user_level,
            req.params.id
        ]
        await User.update_user_info('users', columns, 'id = ?', data);
        req.flash('info_updated', 'Information successfully updated');
        res.redirect(`/users/edit/${req.params.id}`);
    }
}

exports.editPasswordAdmin = async function (req, res) {
    let validate = validator.validatePassword(req.body);
    if (validate != true) {
        req.flash('password_update', validate);
        res.redirect(`/users/edit/${req.params.id}`);
    }
    else {
        let password = await bcrypt.hash(req.body.password, 10);
        let columns = [
            'password',
        ]
        let data = [
            password,
            req.params.id
        ]
        await User.updateUserInfo('users', columns, 'id = ?', data);
        req.flash('password_updated', 'Password successfully updated');
        res.redirect(`/users/edit/${req.params.id}`);
    }
}


