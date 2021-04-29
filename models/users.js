const queries = require('./queries')

function getAllusers(table) {
    let data = queries.get_all_data(table);
    return data;
}

async function addUser(table, columns, data) {
    let result = await queries.insert_data(table, columns, data);
    return result;
}

async function getUser(table, column, data) {
    let result = await queries.get_data(table, column, data);
    return result;
}

async function updateUserInfo(table, column, condition, data) {
    let result = await queries.update_data(table, column, condition, data);
    return result;
}

async function getMessages(data) {
    const query = "SELECT concat(users2.first_name, ' ',users2.last_name) as message_sender, messages.sender_id as sender_id , messages.id as messages_id, messages.message, messages.created_at, GROUP_CONCAT(users3.first_name, ' ' ,users3.last_name) as comm_owner, GROUP_CONCAT(comments.comments) as comments, GROUP_CONCAT(comments.created_at) as comments_created, GROUP_CONCAT(comments.user_id) as comm_user_id from users inner join messages on users.id = messages.user_id inner join users as users2 on messages.sender_id = users2.id left join comments on comments.message_id = messages.id left join users as users3 on comments.user_id = users3.id where users.id = ? group by messages.id order by messages.created_at desc";
    let result = await queries.query(query, data);
    return result;
}
async function insertMessages(table, columns, data) {
    let result = await queries.insert_data(table, columns, data);
    return result;
}

async function getMessage(data) {
    const query = `SELECT messages.id as messages_id, messages.sender_id as sender_id, messages.user_id as wall_id, concat(users.first_name, ' ',users.last_name) as sender_name, messages.created_at as created_at, messages.message as message from messages
    left join users on users.id = messages.sender_id
    where messages.id = ?`
    let result = await queries.query(query, data);
    return result;
}

async function getComment(data) {
    const query = `SELECT comments.user_id as sender_id, concat(users.first_name, ' ', users.last_name) as sender_name, comments.created_at as created_at, comments.comments as comment from comments
    left join users on users.id = comments.user_id
    where comments.id = ?`
    let result = await queries.query(query, data);
    return result;
}

async function inserComment(table, columns, data) {
    let result = await queries.insert_data(table, columns, data);
    return result;
}

module.exports = {
    getAllusers,
    getUser,
    addUser,
    updateUserInfo,
    getMessages,
    insertMessages,
    getMessage,
    inserComment,
    getComment
}