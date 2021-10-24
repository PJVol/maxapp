import { ScaledSheet } from "react-native-size-matters";
import { Colors, Fonts } from "../../../config";

export default ScaledSheet.create({
  title: {
    fontSize: "22@vs",
    fontWeight: Fonts.MEDIUM,
    textAlign: "center",
    marginTop: "20@vs"
  },
  topBar: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    marginTop: "20@vs",
    backgroundColor: Colors.MAIN_BACKGROUND
  },
  dateLabel: {
    textAlign: "center"
  },
  background: {
    backgroundColor: Colors.MAIN_BACKGROUND,
    flex: 1,
    bottom: 0
  },
  date: {
    fontSize: "18@vs",
    fontWeight: Fonts.BOLDER
  },
  modal: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#00000070"
  },
  page: {
    marginTop: "20@vs"
  },
  arrowShow: {
    opacity: 1,
    fontSize: "22@vs"
  },
  arrowHide: {
    opacity: 0
  },
  dateButton: {
    marginHorizontal: "15@s"
  },
  calendarIcon: {
    fontSize: "18@vs"
  }
});
