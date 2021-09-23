import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "../../config";

export default ScaledSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "20@s",
    paddingVertical: "20@vs"
  },
  itemText: {
    fontSize: "18@vs",
    color: Colors.LIGHT_TEXT,
    marginLeft: "20@s"
  },
  emptyItem: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "20@s",
    paddingVertical: "20@vs"
  },
  emptyText: {
    fontSize: "16@vs",
    textAlign: "center"
  },
  itemContent: {
    flexDirection: "column"
  },
  icon: {
    marginVertical: "-20@vs"
  },
  primaryIcon: {
    marginVertical: "-20@vs",
    position: "absolute",
    marginRight: "20@s",
    right: 0,
    fontSize: "18@vs"
  },
  horizontal_ruler: {
    backgroundColor: Colors.BORDER,
    height: "2@vs"
  },
  swipeableActionButton: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  swipeableAction: {
    flex: 1
  },
  swipeableActionWrapper: {
    width: "128@s",
    flexDirection: "row"
  },
  deleteIcon: {
    fontSize: "18@vs"
  },
  starIcon: {
    fontSize: "18@vs"
  }
});
