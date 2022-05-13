import { Dimensions, Platform } from "react-native";

type DimensionsType = {
  fullHeight: number;
  fullWidth: number;
  screenHeight: number;
  screenWidth: number;
};

export function getDimensions(): DimensionsType {
  return {
    fullHeight: Dimensions.get("window").height,
    fullWidth: Dimensions.get("window").width,
    screenHeight: Dimensions.get("screen").height,
    screenWidth: Dimensions.get("screen").width,
  };
}

export const dimensions = {
  fullHeight: Dimensions.get("window").height,
  fullWidth: Dimensions.get("window").width,
  screenHeight: Dimensions.get("screen").height,
  screenWidth: Dimensions.get("screen").width,
};

export const actualDeviceWidth = Math.min(
  dimensions.screenHeight,
  dimensions.screenWidth,
);
export const WIDE_SCREEN = 500;
export const WIDE_LANDSCAPE_SCREEN = 1200;

const isTabletByDims = actualDeviceWidth > WIDE_SCREEN;

export function isScreenWide(width: number = WIDE_SCREEN): boolean {
  return Dimensions.get("window").width > width;
}

const RN_NORMAL_PHONE_WIDTH = 360;
const RN_NORMAL_TABLET_WIDTH = 768;
const NORMAL_DEVICE_WIDTH = isTabletByDims
  ? RN_NORMAL_TABLET_WIDTH
  : RN_NORMAL_PHONE_WIDTH;
const sizeRatio = actualDeviceWidth / NORMAL_DEVICE_WIDTH;

export function normalize(size: number): number {
  // disabled for now as many screens are not ready for this
  if (Platform.OS === "web" || actualDeviceWidth > WIDE_SCREEN) return size;
  return Math.round(size * sizeRatio);
}

export const nrm = normalize;

export const BORDER_RADIUS_SMALL = normalize(12);
export const BORDER_RADIUS = normalize(24);
export const BASIC_HEIGHT = normalize(56);
export const BASIC_HEIGHT_SMALL = normalize(30);
export const HEADER_HEIGHT = normalize(60);
export const HEADER_HEIGHT_MAX = normalize(185);
export const SCREEN_PADDING = normalize(20);
export const DIALOG_SMALL = normalize(320);
export const DIALOG_MEDIUM = normalize(640);
export const TABLET_MAX_WIDTH_2 = 480 + 2 * SCREEN_PADDING;
export const TABLET_MAX_WIDTH_3 = 720 + 2 * SCREEN_PADDING;
export const ELEVATION_SMALL = 3;
export const ELEVATION_BASIC = 5;
export const ELEVATION_BIG = 10;
