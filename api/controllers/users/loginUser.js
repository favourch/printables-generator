import User from '../../models/user';
import { getUserByEmail, comparePassword } from '../../models/user';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(new LocalStrategy(
  function(email, password, done) {

    getUserByEmail(email, function(err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: 'Unknown User' });
      }

      comparePassword(password, user.password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Invalid password' });
        }
      });
   });
}));


const loginUser = (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    console.log('Login user')


}

export default loginUser;