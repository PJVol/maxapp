import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "../../../config";

export default ScaledSheet.create({
  wrapper: {
    borderColor: Colors.LIGHT_BORDER,
    borderWidth: "2@vs",
    borderRadius: "5@vs",
    paddingHorizontal: "20@s",
    marginTop: "30@vs"
  }
});
