var DaliyInfo = require("../controllers/dailyInfo.server.controller.js");

module.exports = function (app) {
  // create dailyInfo
  app
    .route("/api/dailyInfo/create")
    .post(DaliyInfo.requiresLogin, DaliyInfo.isPatient, DaliyInfo.create);

  // to show a list of dailyInfo
  app.route("/api/dailyInfos").get(DaliyInfo.list);

  // read, update, delete dailyInfo by dailyInfo Id
  app
    .route("/api/dailyInfo/:dailyInfoId")
    .get(DaliyInfo.read)
    .put(DaliyInfo.requiresLogin, DaliyInfo.hasAuthorization, DaliyInfo.update)
    .delete(
      DaliyInfo.requiresLogin,
      DaliyInfo.hasAuthorization,
      DaliyInfo.delete
    );
  app.param("dailyInfoId", DaliyInfo.infoByID);
};
