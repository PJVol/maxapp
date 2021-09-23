import { ScaledSheet } from "react-native-size-matters";
import { Colors, Fonts } from "../../../config";

export default ScaledSheet.create({
  contentBlock: {
    backgroundColor: Colors.WHITE_BACKGROUND,
    borderRadius: "5@vs",
    borderWidth: "2@vs",
    borderColor: Colors.BORDER,
    overflow: "hidden",
    flexDirection: "column",
    paddingVertical: "20@vs",
    paddingHorizontal: "20@vs",
    marginTop: "20@vs"
  },
  block_text: {
    fontSize: "16@vs",
    fontWeight: Fonts.REGULAR,
    color: Colors.DARK_TEXT
  },
  auto_status: {
    fontSize: "13@vs",
    fontWeight: Fonts.HEAVY
  },
  separator: {
    backgroundColor: Colors.BORDER,
    height: "2@vs",
    marginHorizontal: "-20@s",
    marginTop: "20@vs"
  },
  buttonText: {
    color: Colors.WHITE_TEXT,
    fontSize: "16@vs",
    fontWeight: Fonts.REGULAR,
    alignSelf: "center"
  },
  pin: {
    fontSize: "16@vs",
    fontWeight: Fonts.REGULAR,
    color: Colors.DARK_TEXT
  },
  amount: {
    fontSize: "16@vs",
    fontWeight: Fonts.REGULAR,
    color: Colors.DARK_TEXT,
    marginTop: "20@vs"
  },
  input: {
    marginTop: "20@vs"
  },
  button: {
    marginTop: "20@vs"
  },
  contactSupport: {
    marginTop: "20@vs"
  }
});
