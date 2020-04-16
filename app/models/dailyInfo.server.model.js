const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DailyInfoSchema = new Schema({
  pulseRate: Number,
  bloodPressure: String,
  weight: Number,
  temperature: Number,
  respiratoryRate: Number,
  lastModified: Date,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

DailyInfoSchema.set("toJSON", {
  getters: true,
  virtuals: true,
});

mongoose.model("DailyInfo", DailyInfoSchema);
