const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DailyInfoSchema = new Schema({
  pulseRate: double,
  bloodPressure: double,
  weight: double,
  temperature: double,
  respiratoryRate: double,
  lastModified: Date,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  created: {
    type: Date,
    default: Date.now
  }
});

DailyInfoSchema.set("toJSON", {
  getters: true,
  virtuals: true
});

mongoose.model("DailyInfo", DailyInfoSchema);
