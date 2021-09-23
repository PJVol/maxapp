import { Platform, StatusBar, Dimensions } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Colors, Fonts } from "../../config";
import { constants } from "../../utils";

export default ScaledSheet.create({
  label: {
    fontSize: "18@vs"
  },
  safeArea: {
    height: Dimensions.get("window").height,
    ...Platform.select({
      ios: {},
      android: {
        paddingTop:
          Platform.Version > constants.ANDROID_VERSION_KITKAT
            ? StatusBar.currentHeight
            : 10
      }
    })
  },
  menu: {
    color: Colors.WHITE_TEXT,
    fontSize: "18@vs",
    fontWeight: Fonts.MEDIUM,
    alignSelf: "flex-end",
    marginBottom: Platform.OS === "android" ? 8 : 12
  },
  closeIcon: {
    fontSize: "22@vs",
    alignSelf: "flex-end",
    paddingBottom: Platform.OS === "ios" ? 8 : 0
  },
  close: {
    marginVertical: "5@vs",
    marginHorizontal: "5@s"
  },
  drawerHeader: {
    flexDirection: "row",
    height: 50,
    borderBottomColor: Colors.MENU_SPACER,
    borderBottomWidth: "2@vs",
    justifyContent: "space-between",
    paddingLeft: "15@s",
    paddingRight: "20@s"
  },
  infoHead: {
    color: Colors.WHITE_TEXT,
    fontSize: "18@vs",
    fontWeight: Fonts.MEDIUM,
    textAlign: "center"
  },
  infoText: {
    marginTop: "7@vs",
    color: Colors.WHITE_TEXT,
    fontSize: "16@vs",
    fontWeight: Fonts.MEDIUM,
    textAlign: "center"
  },
  drawerFooter: {
    marginBottom: "22@vs",
    paddingHorizontal: "7@s",
    paddingVertical: "7@vs",
    position: "absolute",
    alignSelf: "center",
    bottom: 0
  }
});
