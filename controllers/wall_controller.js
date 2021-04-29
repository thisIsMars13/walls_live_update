const User = require('../models/users')
const client = require('../util/redis')
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

exports.show = async function (req, res) {
    let user = await User.getUser('users', 'id', req.params.id);
    let messages = await User.getMessages([req.params.id]);
    messages.forEach(function (message) {
        (message.comm_owner != null) ? message.comm_owner = message.comm_owner.split(',') : false;
        (message.comments != null) ? message.comments = message.comments.split(',') : false;
        (message.comments_created != null) ? message.comments_created = message.comments_created.split(',') : false;
        (message.comm_user_id != null) ? message.comm_user_id = message.comm_user_id.split(',') : false;
    })

    res.render('users_wall', { user: user[0], messages });
}

exports.leaveMessage = async function (req, res) {
    let sender_id = await client.get('id');
    let columns = [
        'user_id',
        'sender_id',
        'message'
    ];
    let data = [
        req.params.id,
        sender_id,
        req.body.message
    ]
    let result = await User.insertMessages('messages', columns, data);
    let message = await User.getMessage(result.insertId);

    let file = fs.readFileSync(path.resolve(__dirname, '../views/partial_message.ejs'), 'utf-8');
    let html = ejs.render(file, { message: message[0] });

    res.send({ "#messages": html });
}
exports.leaveComment = async function (req, res) {
    let sender_id = await client.get('id');
    let columns = [
        'user_id',
        'message_id',
        'comments'
    ];
    let data = [
        sender_id,
        req.params.message_id,
        req.body.comment
    ]
    let result = await User.inserComment('comments', columns, data);

    let comment = await User.getComment(result.insertId);

    let file = fs.readFileSync(path.resolve(__dirname, '../views/partial_comment.ejs'), 'utf-8')
    let html = ejs.render(file, { comment: comment[0] });

    const key = '#' + req.params.message_id + ' ' + '#comments';
    let sendObject = {};
    sendObject[key] = html;

    res.send(sendObject);
}