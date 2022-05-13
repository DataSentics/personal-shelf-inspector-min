import { ExpoConfig } from "@expo/config-types";
import { AndroidConfig, ConfigPlugin, withAndroidManifest } from "@expo/config-plugins";

const { REACT_NATIVE_BUILD_NAME, REACT_NATIVE_BUILD_ENV_NAME, RUN_ENV_NAME } =
  process.env;

const EnvCfg = {
  name: RUN_ENV_NAME === "prod" ? "" : ` ${RUN_ENV_NAME?.toUpperCase()}`,
  slug: RUN_ENV_NAME === "prod" ? "" : `-${RUN_ENV_NAME}`,
  scheme: RUN_ENV_NAME === "prod" ? "" : RUN_ENV_NAME,
  topDomain: RUN_ENV_NAME === "prod" ? "" : `${RUN_ENV_NAME}` + ".",
  bundleOrPackageIdExtra: RUN_ENV_NAME === "prod" ? "" : RUN_ENV_NAME,
  iconFilename:
    RUN_ENV_NAME === "devclient" ? "ic_psi_launcher_dev.png" : "ic_psi_launcher.png",
  splashFilename:
    RUN_ENV_NAME === "devclient" ? "ic_psi_splash_dev.png" : "ic_psi_splash.png",
};

const VERSION = 1;

const config: ExpoConfig = {
  // runtimeVersion: '1.0.0',
  name: `PersonalShelfInspector${EnvCfg.name}`,
  scheme: `shelfinspector${EnvCfg.scheme}`,
  slug: `personal-shelfinspector-app${EnvCfg.slug}`,
  platforms: ["android", "ios", "web"],
  version: `1.0.${VERSION}`,
  icon: `./src/assets/App-ico.png`,
  privacy: "hidden",
  splash: {
    image: `./src/assets/${EnvCfg.splashFilename}`, //todo create images
    resizeMode: "contain",
    backgroundColor: "#0c0c0c",
  },
  updates: {
    fallbackToCacheTimeout: 30000,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: `com.personalshelfinspector.app${EnvCfg.bundleOrPackageIdExtra}`,
    requireFullScreen: true,
  },
  android: {
    package: `com.personalshelfinspector.app${EnvCfg.bundleOrPackageIdExtra}`,
    versionCode: VERSION,
    adaptiveIcon: {
      foregroundImage: `./src/assets/${EnvCfg.iconFilename}`,
      backgroundColor: "#0c0c0c",
    },
    permissions: [
      "CAMERA",
      "WRITE_EXTERNAL_STORAGE",
      "READ_EXTERNAL_STORAGE",
      "READ_INTERNAL_STORAGE",
      "WRITE_INTERNAL_STORAGE",
    ],
  },
  androidStatusBar: {
    hidden: false,
    translucent: true,
  },
  androidNavigationBar: {
    backgroundColor: "#0c0c0c",
  },
  web: {
    themeColor: "#0c0c0c",
    image: `./src/assets/App-ico.png`,
    resizeMode: "cover",
  },
  packagerOpts: {
    config: "metro.config.js",
    sourceExts: ["ts", "tsx", "js", "jsx", "json", "wasm", "svg"],
  },
  extra: {
    REACT_NATIVE_BUILD_NAME,
    REACT_NATIVE_BUILD_ENV_NAME,
    RUN_ENV_NAME,
  },
};

// Using helpers keeps error messages unified and helps cut down on XML format changes.
const { getMainApplicationOrThrow } = AndroidConfig.Manifest;

export const withMyCustomConfig: ConfigPlugin = (config) => {
  return withAndroidManifest(config, async (config) => {
    // Modifiers can be async, but try to keep them fast.
    config.modResults = await setCustomConfigAsync(config, config.modResults);
    return config;
  });
};

// Splitting this function out of the mod makes it easier to test.
async function setCustomConfigAsync(
  config: Pick<ExpoConfig, "android">,
  androidManifest: AndroidConfig.Manifest.AndroidManifest,
): Promise<AndroidConfig.Manifest.AndroidManifest> {
  const appId = "my-app-id";
  // Get the <application /> tag and assert if it doesn't exist.
  const mainApplication = getMainApplicationOrThrow(androidManifest);
  mainApplication.$["android:largeHeap"] = "true";

  return androidManifest;
}

export default withMyCustomConfig(config);
