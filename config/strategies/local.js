// Load the module dependencies
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Student = require("mongoose").model("Student");

// Create the Local strategy configuration method
module.exports = function() {
  // Use the Passport's Local strategy
  passport.use(
    new LocalStrategy(function(username, password, done) {
      Student.findOne(
        {
          studentNumber: username
        },
        (err, student) => {
          if (err) {
            return done(err);
          }
          if (!student) {
            return done(null, false, {
              message: "Unknown user"
            });
          }
          if (!student.authenticate(password)) {
            return done(null, false, {
              message: "Invalid password"
            });
          }
          return done(null, student);
        }
      );
    })
  );
};
