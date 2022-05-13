import { DefaultTheme, configureFonts } from "react-native-paper";

import * as Colors from "./colors";
import injectCss from "./css/css";
import * as Mixins from "./mixins";
import * as Sizes from "./sizes";

injectCss();

const dimensions = Sizes.dimensions;
const getDimensions = Sizes.getDimensions;
const normalize = Sizes.normalize;

const defaultFontConfig = {
  regular: { fontFamily: "Gilroy-Light" },
  medium: { fontFamily: "Gilroy-ExtraBold" },
  light: { fontFamily: "Gilroy-Light" },
  thin: { fontFamily: "Gilroy-Light" },
};

const fontConfig = {
  default: defaultFontConfig,
  ios: defaultFontConfig,
  web: defaultFontConfig,
};

const theme = {
  ...DefaultTheme,
  roundness: Sizes.BORDER_RADIUS,
  fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.PRIMARY,
    accent: Colors.SECONDARY,
    error: Colors.ERROR,
    // background: Colors.PRIMARY,
    surface: Colors.BACKGROUND,
    text: Colors.FONT,
    // placeholder: "red",
  },
};

export { Colors, dimensions, theme, Sizes, Mixins, normalize, getDimensions };
