module.exports = function (app) {
  const login = require("../controllers/login.server.controller");
  const passport = require("passport");

  // index page
  app.route("/").get(login.index);

  // sign up
  app.route("/api/signup").post(login.create);

  // sign in
  app.route("/api/signin").post(
    passport.authenticate("local", {
      successRedirect: "/api/welcome",
      failureRedirect: "/",
      failureFlash: true,
    })
  );

  //
  app.route("/api/read_cookie").get(login.isSignedIn);

  // after success sign in
  app.route("/api/welcome").get(login.welcome);

  // sign out
  app.route("/api/signout").get(login.signout);
};
