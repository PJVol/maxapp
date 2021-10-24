import { ScaledSheet } from 'react-native-size-matters'
import { Colors, Fonts } from '../../../config'

export default ScaledSheet.create({
  topText: {
    fontSize: '22@vs',
    fontWeight: Fonts.REGULAR,
    color: Colors.WHITE_TEXT,
    marginTop: '30@vs',
    textAlign: 'center',
  },
  forgotText: {
    fontSize: '22@vs',
    fontWeight: Fonts.REGULAR,
    color: Colors.WHITE_TEXT,
  },
  forgotButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '20@vs',
  },
})
