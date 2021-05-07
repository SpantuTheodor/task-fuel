function confirmPasswordValidation(password, confirmPassword) {
    
    if(password !== confirmPassword){
        return "Passwords do not match."
    } else {
        return ""
    }

}

export default confirmPasswordValidation;