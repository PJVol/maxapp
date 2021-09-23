import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import DeviceInfo from "react-native-device-info";
import { Sentry } from "react-native-sentry";

Sentry.con fig(
  "https://a4606b8188a74d499acee6827a6714c4@sentry.io/1444231"
).install();
Sentry.setExtraContext({ deviceID: DeviceInfo.getUniqueID() });

AppRegistry.registerComponent(appName, () => App);
