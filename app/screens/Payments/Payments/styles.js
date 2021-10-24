import { ScaledSheet } from "react-native-size-matters";
import { Colors, Fonts } from "../../../config";

export default ScaledSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: "20@vs",
    paddingHorizontal: "20@s"
  },
  contentBlock: {
    backgroundColor: Colors.WHITE_BACKGROUND,
    borderRadius: "5@vs",
    borderWidth: "2@vs",
    borderColor: Colors.BORDER,
    overflow: "hidden",
    marginTop: "20@vs"
  },
  block_text: {
    fontSize: "18@vs",
    fontWeight: Fonts.REGULAR,
    color: Colors.DARK_TEXT
  },
  auto_status: {
    fontSize: "13@vs",
    fontWeight: Fonts.HEAVY
  },
  horizontal_ruler: {
    backgroundColor: Colors.BORDER,
    height: "2@vs"
  },
  icon: {
    position: "absolute",
    right: "20@s",
    fontSize: "18@vs"
  },
  contactSupport: {
    marginTop: "20@vs"
  }
});
