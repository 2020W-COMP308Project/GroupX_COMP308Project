const tf = require("@tensorflow/tfjs");
// const tf_node = require("@tensorflow/tfjs-node");
const modelSaveLocation = "./app/ml/model/heart_disease/model.json";

exports.heartDiseasePredict = async (req, res) => {
  let data = req.body;
  const model = await tf.loadLayersModel(`file://` + modelSaveLocation);

  const testData = [req.body];

  const testingData = tf.tensor2d(
    testData.map((attr) => [
      attr.age,
      attr.cp,
      attr.sex,
      attr.trestbps,
      attr.chol,
      attr.thalach,
      attr.fbs,
      attr.exang,
    ])
  );

  const results = model.predict(testingData);
  results.array().then((array) => {
    res.json(array[0][0]);
  });
};
