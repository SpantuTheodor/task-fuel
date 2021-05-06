function emailValidation(email) {
    
    if(!email.match(/.*[@].*/)){
        return "This is not a valid email"
    } else {
        return ""
    }

}

export default emailValidation;