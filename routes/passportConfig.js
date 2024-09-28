const LocalStrategy=require('passport-local').Strategy;
const {User,Admin}=require('../dataBase/db');
const bcrypt=require('bcrypt');
exports.initializingPassport_user = (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            // Find the user by email
            const user = await User.findOne({ email: email });
            if (!user) {
                return done(null, false, { message: "Incorrect username or password" });
            }

            // Compare the password with the hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: "Incorrect username or password" });
            }

            // If user exists and password matches, return the user
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });

    passport.deserializeUser(async (id,done)=>{
        try{
            const user=await User.findById(id);
            done(null,user);
        }catch(err){
            done(err,false);
        }
    });

};



exports.initializingPassport_user = (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            // Find the user by email
            console.log(email,password);
            const user = await Admin.findOne({ email: email });
            if (!user) {
                return done(null, false, { message: "Incorrect username or password" });
            }

            // Compare the password with the hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: "Incorrect username or password" });
            }

            // If user exists and password matches, return the user
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });

    passport.deserializeUser(async (id,done)=>{
        try{
            const user=await User.findById(id);
            done(null,user);
        }catch(err){
            done(err,false);
        }
    });

};