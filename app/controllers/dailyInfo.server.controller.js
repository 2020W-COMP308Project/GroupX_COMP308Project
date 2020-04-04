const User = require("mongoose").model("User");
const DailyInfo = require("mongoose").model("DailyInfo");

const getErrorMessage = function (err) {
  var message = "";
  if (err.code) {
    switch (err.code) {
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

exports.requiresLogin = function (req, res, next) {
  if (!req.user) {
    return res.send({ screen: "auth" }).end();
  }
  next();
};

exports.isPatient = function (req, res, next) {
  if (req.user && req.user.role.equals("patient")) {
    next();
  } else {
    return res.status(403).send({
      message: "User is not able to create Daily Info",
    });
  }
};

exports.hasAuthorization = function (req, res, next) {
  if (!req.dailyInfo.owner.equals(req.user._id)) {
    return res.status(403).send({
      message: "User is not authorized",
    });
  }
  next();
};

exports.create = function (req, res) {
  const dailyInfo = new DailyInfo(req.body);
  dailyInfo.owner = req.user._id;
  dailyInfo.lastModified = Date.now;

  dailyInfo.save((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err),
      });
    } else {
      res.status(200).json(dailyInfo);
    }
  });
};

exports.list = function (req, res) {
  DailyInfo.find()
    .sort("-owner")
    .sort("-created")
    .exec((err, dailyInfo) => {
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err),
        });
      } else {
        return res.status(200).json(dailyInfo);
      }
    });
};

exports.infoByID = function (req, res, next, id) {
  DailyInfo.findById(id).exec((err, dailyInfo) => {
    if (err) return next(err);
    if (!dailyInfo) return next(new Error("Failed to load daily Info " + id));
    req.dailyInfo = dailyInfo;
    req.dailyInfoId = dailyInfo._id;
    next();
  });
};

exports.read = function (req, res) {
  res.status(200).json(req.dailyInfo);
};

exports.update = function (req, res) {
  DailyInfo.findByIdAndUpdate({ _id: req.dailyInfoId }, req.body, function (
    err,
    dailyInfo
  ) {
    if (err) return next(err);
    res.json(dailyInfo);
  });
};

exports.delete = function (req, res) {
  DailyInfo.findOneAndRemove({ _id: req.dailyInfoId }, req.body, function (
    err,
    dailyInfo
  ) {
    if (err) return next(err);
    res.json(dailyInfo);
  });
};
