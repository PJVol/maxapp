import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "../../config";

export default ScaledSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "20@s",
    paddingVertical: "20@vs"
  },
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
  itemContent: {
    flexDirection: "column"
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
  },
  arrow: {
    position: "absolute",
    right: "20@s",
    fontSize: "18@vs"
  },
  header: {
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center"
  },
  collapseIconDown: {
    opacity: 1,
    transform: [
      {
        rotate: "0deg"
      }
    ],
    position: "absolute",
    right: "20@s",
    fontSize: "18@vs"
  },
  collapseIconUp: {
    opacity: 1,
    transform: [
      {
        rotate: "180deg"
      }
    ],
    position: "absolute",
    right: "20@s",
    fontSize: "18@vs"
  },
  collapseIconHide: {
    opacity: 0,
    position: "absolute",
    right: "20@s"
  }
});
