import { ScaledSheet } from "react-native-size-matters";
import { Colors, Fonts } from "../../../config";

export default ScaledSheet.create({
  statusBlock: {
    backgroundColor: Colors.WHITE_BACKGROUND,
    borderRadius: "5@vs",
    borderWidth: "2@vs",
    borderColor: Colors.BORDER,
    overflow: "hidden",
    flexDirection: "row",
    paddingHorizontal: "20@s",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "20@vs"
  },
  cardsBlock: {
    backgroundColor: Colors.WHITE_BACKGROUND,
    borderRadius: "5@vs",
    borderWidth: "2@vs",
    borderColor: Colors.BORDER,
    overflow: "hidden",
    marginTop: "20@vs"
  },
  cardsHeader: {
    backgroundColor: Colors.WHITE_BACKGROUND,
    overflow: "hidden",
    flexDirection: "row",
    paddingVertical: "20@vs",
    paddingHorizontal: "20@s",
    alignItems: "center",
    justifyContent: "space-between"
  },
  cardsFooter: {
    backgroundColor: Colors.WHITE_BACKGROUND,
    overflow: "hidden",
    flexDirection: "column",
    paddingVertical: "20@vs",
    paddingHorizontal: "20@s"
  },
  block_headlines: {
    fontSize: "18@vs",
    fontWeight: Fonts.REGULAR,
    color: Colors.DARK_TEXT
  },
  status: {
    fontSize: "18@vs",
    fontWeight: Fonts.REGULAR,
    color: Colors.DARK_TEXT,
    marginVertical: "20@vs"
  },
  block_text: {
    fontSize: "16@vs",
    fontWeight: Fonts.REGULAR,
    color: Colors.DARK_TEXT
  },
  amount: {
    fontSize: "13@vs",
    fontWeight: Fonts.REGULAR,
    color: Colors.DARK_TEXT
  },
  footer_text: {
    fontSize: "13@vs",
    fontWeight: Fonts.REGULAR,
    color: Colors.DARK_TEXT,
    marginTop: "15@vs"
  },
  horizontal_ruler: {
    backgroundColor: Colors.BORDER,
    height: "2@vs"
  },
  limitInput: {
    marginTop: "10@vs"
  },
  plusIcon: {
    fontSize: "18@vs"
  },
  contactSupport: {
    marginTop: "20@vs"
  },
  switch: {
    marginVertical: "-20@vs"
  }
});
