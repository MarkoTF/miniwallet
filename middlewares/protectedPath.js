exports.authenticationMiddleware = (loginPath, whiteList=[]) => (req, res, next) => {
    if (!req.isAuthenticated() && 
        req.originalUrl != loginPath && 
        !whiteList.includes(req.originalUrl)){

        res.redirect(loginPath);
    } else {
        next();
    }
}
