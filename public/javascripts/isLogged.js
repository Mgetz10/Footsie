
module.exports = {
  isLoggedIn: function(req, res, next) {
    console.log('isloggedin', req.isAuthenticated());
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  },
  logOut: function() {}
};
