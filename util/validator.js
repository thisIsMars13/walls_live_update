const queries = require('../models/queries')
function isEmail(email) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return true;
    }
    return "Invalid email address";
}

function isName(name) {
    if (name.trim().length > 0) {
        if (/^[ a-zA-Z\-\’]+$/.test(name)) {
            return true;
        }
        return "Please dont use special character for name";
    }
    return "Name must not be empty";
}

function isPassword(pass) {
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(pass)) {
        return true;
    }
    return "Password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter";
}

function matchPass(object) {
    if (object.password === object.c_password) {
        return true;
    }
    return "Password and Confirm password must match";
}

async function checkEmailInDB(email) {
    return await queries.get_data('users', 'email', email);
}

async function register(objects) {
    let errors = {};

    if (isName(objects.first_name) != true) {
        errors.first_name = (isName(objects.first_name));
    }

    if (isName(objects.last_name) != true) {
        errors.last_name = (isName(objects.last_name));
    }

    if (isPassword(objects.password) != true) {
        errors.password = (isPassword(objects.password));
    }
    else if (matchPass(objects) != true) {
        errors.password = (matchPass(objects));
    }

    if (isEmail(objects.email) != true) {
        errors.email = (isEmail(objects.email));
    }
    else {
        let result = await checkEmailInDB(objects.email);
        if (result.length > 0) {
            errors.email = "Email already in used";
        }
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    }
    return true;
}

async function validateInfo(objects) {
    let errors = {};
    if (isName(objects.first_name) != true) {
        errors.first_name = isName(objects.first_name);
    }

    if (isName(objects.last_name) != true) {
        errors.last_name = isName(objects.last_name);
    }


    if (isEmail(objects.email) != true) {
        errors.email = (isEmail(objects.email));
    }
    else {
        let data = await checkEmailInDB(objects.email)
        if (data.length > 1) {
            errors.email = "Email already exists"
        }
    }
    if (Object.keys(errors).length > 0) {
        return errors;
    }

    return true;
}

function validatePassword(objects) {
    let errors = {};
    if (isPassword(objects.password) != true) {
        errors.password = isPassword(objects.password);
    }
    else if (matchPass(objects) != true) {
        errors.password = matchPass(objects)
    }
    if (Object.keys(errors).length > 0) {
        return errors;
    }
    return true;
}

module.exports = {
    register,
    validateInfo,
    validatePassword
}