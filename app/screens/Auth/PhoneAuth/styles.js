import { ScaledSheet } from "react-native-size-matters";
import { Colors, Fonts } from "../../../config";

export default ScaledSheet.create({
  lightFont: {
    color: Colors.WHITE_TEXT
  },
  formSpacing: {
    marginTop: "7@vs"
  },
  form: {
    borderColor: Colors.LIGHT_BORDER,
    borderWidth: "2@vs",
    borderRadius: "5@vs",
    paddingHorizontal: "20@s",
    paddingBottom: "30@vs",
    paddingTop: "17@vs",
    marginTop: "20@vs"
  },
  buttonText: {
    color: Colors.WHITE_TEXT,
    fontSize: "16@vs",
    fontWeight: Fonts.REGULAR,
    alignSelf: "center"
  },
  label: {
    color: Colors.WHITE_TEXT,
    fontSize: "16@vs"
  },
  timeoutShow: {
    opacity: 1,
    color: Colors.WHITE_TEXT,
    fontSize: "7@vs",
    alignSelf: "center",
    marginTop: "7@vs"
  },
  timeoutHide: {
    marginTop: 0,
    height: 0,
    opacity: 0
  },
  buttonMarginSmall: {
    marginTop: "7@vs"
  },
  buttonMargin: {
    marginTop: "30@vs"
  },
  formInput: {
    marginTop: "7@vs"
  },
  switcherText: {
    color: Colors.WHITE_TEXT,
    fontSize: "16@vs",
    textAlign: "center"
  },
  switcher: {
    marginTop: "20@vs"
  }
});
