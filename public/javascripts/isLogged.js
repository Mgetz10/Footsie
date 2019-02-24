function isLoggedIn(req, res, next) {
  console.log('isloggedin', req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = isLoggedIn;
