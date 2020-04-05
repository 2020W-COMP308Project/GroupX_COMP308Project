var DaliyInfo = require("../controllers/dailyInfo.server.controller");
var login = require("../controllers/login.server.controller");

module.exports = function (app) {
  // create dailyInfo
  app
    .route("/api/dailyInfo/create")
    .post(login.requiresLogin, login.isPatient, DaliyInfo.create);

  // to show a list of dailyInfo
  app.route("/api/dailyInfos").get(DaliyInfo.list);

  // read, update, delete dailyInfo by dailyInfo Id
  app
    .route("/api/dailyInfo/:dailyInfoId")
    .get(DaliyInfo.read)
    .put(login.requiresLogin, DaliyInfo.hasAuthorization, DaliyInfo.update)
    .delete(login.requiresLogin, DaliyInfo.hasAuthorization, DaliyInfo.delete);
  app.param("dailyInfoId", DaliyInfo.infoByID);
};
