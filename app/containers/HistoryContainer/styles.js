import { Dimensions } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "../../config";

export default ScaledSheet.create({
  emptyItem: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "20@s",
    paddingVertical: "20@vs"
  },
  emptyText: {
    fontSize: "18@vs",
    textAlign: "center"
  },
  separator: {
    backgroundColor: Colors.BORDER,
    height: "2@vs"
  },
  wrapper: {
    backgroundColor: Colors.WHITE_BACKGROUND,
    borderRadius: "5@vs",
    borderWidth: "2@vs",
    borderColor: Colors.BORDER,
    marginHorizontal: "20@s"
  },
  safeArea: {
    flex: 1,
    width: Dimensions.get("window").width,
    backgroundColor: Colors.MAIN_BACKGROUND
  },
  comment: {
    fontSize: "13@vs",
    color: Colors.LIGHT_TEXT,
    alignSelf: "center",
    textAlign: "center"
  },
  commentWrapper: {
    marginTop: "7@vs"
  },
  date: {
    fontSize: "13@vs",
    color: Colors.DARK_TEXT,
    textAlign: "center"
  },
  dateWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "flex-end"
  },
  verticalSpacer: {
    flex: 0.1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center"
  },
  amount: {
    fontSize: "13@vs",
    color: Colors.DARK_TEXT,
    marginLeft: "7@s"
  },
  amountWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "flex-start"
  },
  paymentInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between"
  },
  item: {
    paddingVertical: "16@vs",
    paddingHorizontal: "20@s",
    flexDirection: "column"
  },
  icon: {
    fontSize: "13@vs"
  },
  separatorPositive: {
    fontSize: "18@vs",
    color: Colors.GREEN_SEPARATOR
  },
  separataorNegative: {
    fontSize: "18@vs",
    color: Colors.RED_SEPARATOR
  }
});
