import "expo-dev-client";

import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GraphModel } from "@tensorflow/tfjs-converter";
import { getModel } from "_utils/tensor-helper";
import { modelNames } from "_utils/modelNames";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Colors } from "_styles/base";

export default function App() {
  const [loadingError, setLoadingError] = useState<string>("");

  const [findTextModel, setFindTextModel] = useState<GraphModel | undefined>(undefined);
  const [findPricetagModel, setFindPricetagModel] = useState<GraphModel | undefined>(
    undefined,
  );

  let isPriceTagModelLoaded = findPricetagModel != undefined;
  let isFindTextModelLoaded = findTextModel != undefined;

  useEffect(() => {
    const loadPricetagModel = async () => {
      if (findPricetagModel === undefined) {
        await loadYoloModel(modelNames.PRICE_TAG_MODEL);
      }
    };
    isPriceTagModelLoaded = findPricetagModel != undefined;
    loadPricetagModel();
  }, [findPricetagModel]);

  useEffect(() => {
    const loadTextModel = async () => {
      if (findTextModel === undefined) {
        await loadYoloModel(modelNames.FIND_TEXT_IN_COLLAGE);
      }
    };
    loadTextModel();
    isFindTextModelLoaded = findTextModel != undefined;
  }, [findTextModel]);

  const loadYoloModel = async (modelType: string) => {
    const beforeModelLoad = Date.now();
    try {
      const model = await getModel(modelType);

      if (modelType == modelNames.PRICE_TAG_MODEL) {
        setFindPricetagModel(model);
      }
      if (modelType == modelNames.FIND_TEXT_IN_COLLAGE) {
        setFindTextModel(model);
      }
      const afterModelLoad = Date.now();
      console.log("Model Load time ", modelType, afterModelLoad - beforeModelLoad);
    } catch (error) {
      console.log("Could not load model", error);
      setLoadingError("Could not load model\n" + JSON.stringify(error));
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.resultViewContainer}>
        {!isPriceTagModelLoaded && (
          <Text style={{ textAlign: "center" }}>
            Loading [findPricetagModel] model in progress...
          </Text>
        )}
        {!isFindTextModelLoaded && (
          <Text style={{ textAlign: "center" }}>
            Loading [findTextModel] model in progress...
          </Text>
        )}
        {(!isPriceTagModelLoaded || !isFindTextModelLoaded) && (
          <>
            <ActivityIndicator
              style={{ paddingTop: 10 }}
              size={"large"}
              color={Colors.PRIMARY}
            />
          </>
        )}
        {loadingError != "" && (
          <Text style={{ textAlign: "center" }}>{loadingError}</Text>
        )}
        {loadingError == "" && isPriceTagModelLoaded && isFindTextModelLoaded && (
          <Text style={{ textAlign: "center" }}>Models are loaded and ready!</Text>
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  resultViewContainer: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
  },
});
