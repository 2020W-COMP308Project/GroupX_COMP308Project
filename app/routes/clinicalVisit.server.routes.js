var ClinicalVisit = require("../controllers/clinicalVisit.server.controller");
var login = require("../controllers/login.server.controller");

module.exports = function (app) {
  // create ClinicalVisit
  app
    .route("/api/clinicalVisit/create")
    .post(login.requiresLogin, login.isNurse, ClinicalVisit.create);

  // to show a list of ClinicalVisit
  app.route("/api/clinicalVisits").get(ClinicalVisit.list);

  // read, update, delete ClinicalVisit by Clinical Visit Id
  app
    .route("/api/clinicalVisit/:clinicalVisitId")
    .get(ClinicalVisit.read)
    .put(
      login.requiresLogin,
      ClinicalVisit.hasAuthorization,
      ClinicalVisit.update
    )
    .delete(
      login.requiresLogin,
      ClinicalVisit.hasAuthorization,
      ClinicalVisit.delete
    );
  app.param("clinicalVisitId", ClinicalVisit.infoByID);
};
