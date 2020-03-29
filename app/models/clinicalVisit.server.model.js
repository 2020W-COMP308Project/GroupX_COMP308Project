const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClinicalVisitSchema = new Schema({
  bodyTemperature: double,
  heartRate: double,
  bloodPressure: double,
  respiratoryRate: double,
  status: String,
  date: Date,
  nurse: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  patient: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  created: {
    type: Date,
    default: Date.now
  }
});

ClinicalVisitSchema.set("toJSON", {
  getters: true,
  virtuals: true
});

mongoose.model("ClinicalVisit", ClinicalVisitSchema);
