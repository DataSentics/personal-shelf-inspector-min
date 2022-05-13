import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";

const MODELS = {
  findTextModel: {
    json: require("../model/modelT.json"),
    weights: require("../model/weightsT.bin"),
  },
  findPriceTagModel: {
    json: require("../model/model.json"),
    weights: require("../model/weights.bin"),
  },
};

// 0: channel from JPEG-encoded image
// 1: gray scale
// 3: RGB image
const TENSORFLOW_CHANNEL = 3;

/**
 *
 * @param {string} modelType MODELS dictionary key name
 * @returns Promise<tf.GraphModel | undefined>
 */
export const getModel = async (modelType) => {
  let errorTime = "";
  try {
    // wait until tensorflow is ready
    await tf.ready();
    errorTime += ";tf ready";
    // load the trained model
    const resources = MODELS[modelType];
    errorTime += "; rescources ok";
    const jsonRes = resources.json;
    errorTime += ";json ok";
    const weights = resources.weights;
    errorTime += ";weights ok";
    const bundledResource = bundleResourceIO(jsonRes, weights);
    errorTime += ";resource bundled ok";
    const thing = await tf.loadGraphModel(bundledResource); // tf.loadGraphModel(bundledResource);
    errorTime += ";thing ok";
    return thing;
  } catch (error) {
    console.log("Could not load model", error);
    throw { error: error, modelName: modelType, errorTime: errorTime };
  }
};
