function passwordValidation(password) {
    
    if(password.length < 7){
        return "Password is too short."
    } else if(password.length > 30){
        return "Password is too long."
    } else if (!password.match(/.*[0-9].*/)) {
        return "Password must contain at least a digit."
    } else if(!password.match(/.*[^a-zA-Z0-9].*/)){
        return "Password must contain at least a non-alphanumeric character."
    } else {
        return ""
    }

}

export default passwordValidation;