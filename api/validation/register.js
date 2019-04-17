const validator = require('validator')
const isEmpty = require('./isEmpty')

function validationRegisterInput(data) {
    let errors = {}
    data.user_name = !isEmpty(data.user_name) ? data.user_name : ''
    data.user_email = !isEmpty(data.user_email) ? data.user_email : ''
    data.user_country = !isEmpty(data.user_country) ? data.user_country : ''
    data.user_password = !isEmpty(data.user_password) ? data.user_password : ''

    if (validator.isEmpty(data.user_name)) {
        errors.name = "Username field is required"
    }

    if (!validator.isLength(data.user_name, { min: 3, max: 30 })) {
        errors.name = "Username must be between 3 and 30 caracters"
    }

    if (validator.isEmpty(data.user_email)) {
        errors.email = "Email field is required"
    }

    if (!validator.isEmail(data.user_email)) {
        errors.email = "Email is not valid"
    }

    if (validator.isEmpty(data.user_password)) {
        errors.password = "Password field is required"
    }

    if (validator.isLength(data.user_password, { min: 6, max: 12 })) {
        errors.name = "Password must be between 6 and 12 caracters"
    }

    if (validator.isEmpty(data.user_country)) {
        errors.name = "Country field is required"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validationRegisterInput