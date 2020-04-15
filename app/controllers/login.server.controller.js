const User = require("mongoose").model("User");

const getErrorMessage = function (err) {
  var message = "";
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = "username already exists";
        break;
      default:
        message = "something went wrong";
    }
  } else {
    for (const errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }
  return message;
};

exports.index = function (req, res) {
  res.render("index", {
    heading: "Express REST API",
  });
};

exports.create = function (req, res) {
  const user = new User(req.body);
  user.provider = "local";
  user.verified = true;
  user.save((err) => {
    if (err) {
      const message = getErrorMessage(err);
      req.flash("error", message); //save the error into flash memory.
      //return next(err);
      return res.send({
        screen: "error",
        message: "Not able register with given information",
      });
    } else {
      return res.json(user);
    }
  });
};

exports.welcome = function (req, res) {
  if (!req.user) {
    return res.send({ screen: "auth" }).end();
  }
  res.status(200).send({
    screen: req.user._id
  });
};

exports.signout = function (req, res) {
  req.logout();
  req.session.destroy();
  return res.status("200").json({ message: "signed out" });
};

exports.isSignedIn = (req, res) => {
  if (!req.user) {
    return res.send({ screen: "auth", role: "auth" }).end();
  }
  return res.send({ screen: req.user._id, role: req.user.role }).end();
};

exports.requiresLogin = function (req, res, next) {
  if (!req.user) {
    return res.send({ screen: "auth" }).end();
  }
  next();
};

exports.isPatient = function (req, res, next) {
  if (req.user && req.user.role === "patient") {
    next();
  } else {
    return res.status(403).send({
      message: "User is not able to create Daily Info",
    });
  }
};

exports.isNurse = function (req, res, next) {
  if (req.user && req.user.role === "nurse") {
    next();
  } else {
    return res.status(403).send({
      message: "User is not able to create Daily Info",
    });
  }
};
//
// Returns all users
exports.list = function (req, res, next) {
  // Use the 'User' instance's 'find' method to retrieve a new user document
  User.find({}, function (err, users) {
    if (err) {
      return next(err);
    } else {
      res.json(users);
    }
  });
};

// Returns all patients
exports.listPatient = function (req, res, next) {
    // Use the 'User' instance's 'find' method to retrieve a new user document
    User.find({"role": "patient"}, function (err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};
