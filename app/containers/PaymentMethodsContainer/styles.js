import { ScaledSheet } from "react-native-size-matters";
import { Colors, Fonts } from "../../config";

export default ScaledSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "20@s",
    paddingVertical: "20@vs"
  },
  itemContent: {
    flexDirection: "column"
  },
  block_text: {
    fontSize: "18@vs",
    fontWeight: Fonts.REGULAR,
    color: Colors.DARK_TEXT,
    textAlign: "center"
  },
  auto_status: {
    fontSize: "13@vs",
    fontWeight: Fonts.HEAVY,
    marginTop: "7@vs"
  },
  arrow: {
    position: "absolute",
    right: "20@vs",
    fontSize: "18@vs"
  },
  contentBlock: {
    backgroundColor: Colors.WHITE_BACKGROUND,
    borderRadius: "5@vs",
    borderWidth: "2@vs",
    borderColor: Colors.BORDER,
    overflow: "hidden",
    marginTop: "20@vs"
  },
  horizontal_ruler: {
    backgroundColor: Colors.BORDER,
    height: "2@vs"
  }
});
