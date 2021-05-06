function usernameValidation(username) {
    
    if(username.length < 7){
        return "Username is too short."
    } else if(username.length > 30){
        return "Username is too long."
    } else {
        return ""
    }

}

export default usernameValidation;