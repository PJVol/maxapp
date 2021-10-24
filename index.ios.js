import { AppRegistry } from "react-native";
import KeyboardManager from "react-native-keyboard-manager";
import App from "./App";
import { name as appName } from "./app.json";
import { Sentry } from "react-native-sentry";

Sentry.config(
  "https://a4606b8188a74d499acee6827a6714c4@sentry.io/1444231"
).install();

KeyboardManager.setToolbarPreviousNextButtonEnable(true);
AppRegistry.registerComponent(appName, () => App);
