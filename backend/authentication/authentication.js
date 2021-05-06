const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    
    const authenticationHeader = req.get('Authorization');
    if( !authenticationHeader ) {
        req.isAuthenticated = false;
        return next();
    }

    const token = authenticationHeader.split(' ')[1];
    if( !token || token === '' ){
        req.isAuthenticated = false;
        return next();
    }

    let decodedToken;
    try{
        decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    } catch (err) {
        req.isAuthenticated = false;
        return next();
    }

    if(!decodedToken){
        req.isAuthenticated = false;
        return next();
    }
    req.isAuthenticated = true;
    req.userId = decodedToken.userId;
    next();
}