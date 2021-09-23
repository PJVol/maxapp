import { ScaledSheet } from 'react-native-size-matters'
import { Colors, Fonts } from '../../../config'

export default ScaledSheet.create({
  lightFont: {
    color: Colors.WHITE_TEXT,
  },
  formSpacing: {
    marginTop: '7@vs',
  },
  form: {
    borderColor: Colors.LIGHT_BORDER,
    borderWidth: '2@vs',
    borderRadius: '5@vs',
    paddingHorizontal: '20@s',
    paddingBottom: '30@s',
    paddingTop: '17@vs',
    marginTop: '20@vs',
  },
  buttonText: {
    color: Colors.WHITE_TEXT,
    fontSize: '16@vs',
    fontWeight: Fonts.REGULAR,
    alignSelf: 'center',
  },
  label: {
    color: Colors.WHITE_TEXT,
    fontSize: '16@vs',
  },
  bottomLabel: {
    color: Colors.WHITE_TEXT,
    fontSize: '16@vs',
    textAlign: 'center',
  },
  button: {
    marginTop: '30@vs',
  },
  bottomSwitcher: {
    marginTop: '20@vs',
  },
  formInput: {
    marginTop: '7@vs',
  },
})
