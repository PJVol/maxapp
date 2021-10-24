import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "../../config";

export default ScaledSheet.create({
  itemContent: {
    flexDirection: "column",
    marginRight: "12@s"
  },
  header: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerIcon: {
    marginLeft: "10@s"
  },
  headerTitle: {
    fontSize: "18@vs",
    marginVertical: "20@vs",
    marginLeft: "7@s"
  },
  itemTitle: {
    fontSize: "18@vs"
  },
  itemText: {
    color: Colors.LIGHT_TEXT,
    fontSize: "16@vs",
    marginTop: "7@vs"
  }
});
