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
      failureRedirect: "/api/error",
      failureFlash: true,
    })
  );
//
//
  app.get("/users", login.list); 
  app.get("/patients", login.listPatient); 
  //
  app.route("/api/read_cookie").get(login.isSignedIn);

  // after success sign in
  app.route("/api/welcome").get(login.welcome);
    // after error sign in
    app.route("/api/error").get(login.error);

  // sign out
  app.route("/api/signout").get(login.signout);

    // Set up the 'users' parameterized routes
    app
        .route("/users/:username")
        .get(login.read)
        .put(login.update)
        .delete(login.delete);
    // Set up the 'username' parameter middleware
    //All param callbacks will be called before any handler of
    //any route in which the param occurs, and they will each
    //be called only once in a request - response cycle,
    //even if the parameter is matched in multiple routes
    app.param("username", login.userByID);

};
