import { ScaledSheet } from "react-native-size-matters";
import { Colors, Fonts } from "../../config";

export default ScaledSheet.create({
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "space-between",
    paddingVertical: "20@vs"
  },
  agreement: {
    color: Colors.WHITE_TEXT,
    fontSize: "16@vs",
    fontWeight: Fonts.MEDIUM,
    flex: 0.3
  },
  name: {
    color: Colors.WHITE_TEXT,
    fontSize: "16@vs",
    fontWeight: Fonts.MEDIUM,
    textAlign: "center",
    flex: 0.7
  },
  separator: {
    backgroundColor: Colors.BORDER,
    height: "2@vs"
  }
});
