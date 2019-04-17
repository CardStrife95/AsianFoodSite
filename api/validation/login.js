const validator = require('validator')
const isEmpty = require('./isEmpty')

function validateLoginInput(data) {
    let errors = {}
    data.user_email_or_name = !isEmpty(data.user_email_or_name) ? data.user_email_or_name : ''
    data.user_password = !isEmpty(data.user_password) ? data.user_password : ''

    if (validator.isEmpty(data.user_email_or_name)) {
        errors.name = "Email or Username field is required"
    }

    if (validator.isEmpty(data.user_password)) {
        errors.password = "Password field is required"
    }

    return {
        errors,
        isValid: isEmpty(errors),
    }
}

module.exports = validateLoginInput