import { ScaledSheet } from 'react-native-size-matters'
import { Colors, Fonts } from '../../config'

export default ScaledSheet.create({
  balanceWrapper: {
    marginTop: '20@vs',
    textAlign: 'center',
  },
  contentBlock: {
    backgroundColor: Colors.WHITE_BACKGROUND,
    borderRadius: '5@vs',
    borderWidth: '2@vs',
    borderColor: Colors.BORDER,
    overflow: 'hidden',
    paddingHorizontal: '20@s',
    paddingVertical: '20@vs',
    marginTop: '20@vs',
  },
  block_title: {
    fontSize: '16@vs',
    fontWeight: Fonts.REGULAR,
  },
  separator: {
    backgroundColor: Colors.BORDER,
    height: '2@vs',
    marginHorizontal: '-20@s',
    marginTop: '7@vs',
  },
  currency: {
    fontSize: '25@vs',
  },
  amount: {
    fontSize: '50@vs',
    fontWeight: Fonts.MEDIUM,
  },
  buttonText: {
    color: Colors.WHITE_TEXT,
    fontSize: '16@vs',
    fontWeight: Fonts.REGULAR,
    alignSelf: 'center',
  },
  button: {
    marginTop: '20@vs',
  },
  contactSupport: {
    marginTop: '20@vs',
  },
})
