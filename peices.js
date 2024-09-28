

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Define the Local Strategy outside the route
passport.use(new LocalStrategy(
  {
    usernameField: 'email', // This tells Passport to look for 'email' instead of 'username'
    passwordField: 'password'
  },
  async function(email, password, done) {
    try {
      // Logic to check email and password in your database
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!user.verifyPassword(password)) {  // Ensure you have a password verification function
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));


UserRouter.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',  // Redirect to this route on success
    failureRedirect: '/login',      // Redirect to this route on failure
    failureFlash: true              // Enable flash messages if using them
  }));
  