import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../config'

export default StyleSheet.create({
  pinEnter: {
    height: 15,
    width: 15,
    borderRadius: 15,
    borderColor: Colors.WHITE_BACKGROUND,
    borderWidth: 2,
    marginHorizontal: 7,
    backgroundColor: '#00000000',
  },

  pinEnterHighlight: {
    height: 15,
    width: 15,
    borderRadius: 15,
    borderColor: Colors.WHITE_BACKGROUND,
    borderWidth: 2,
    marginHorizontal: 7,
    backgroundColor: Colors.WHITE_BACKGROUND,
  },

  topText: {
    fontSize: 22,
    color: Colors.WHITE_TEXT,
    marginTop: 30,
    textAlign: 'center',
  },

  forgotText: {
    fontSize: 22,
    color: Colors.WHITE_TEXT,
  },

  pinKey: {
    borderColor: Colors.WHITE_BACKGROUND,
    borderWidth: 2,
    flex: 1,
    aspectRatio: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    maxWidth: 140,
    minWidth: 30,
    borderRadius: 70,
  },

  pinText: {
    color: Colors.WHITE_TEXT,
    fontSize: 32,
    alignSelf: 'center',
  },

  utilityPinKey: {
    flex: 1,
    aspectRatio: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    maxWidth: 140,
    minWidth: 30,
    borderRadius: 70,
    padding: 5,
  },

  biometricIcon: {
    flex: 1,
    tintColor: Colors.WHITE_BACKGROUND,
    aspectRatio: 1,
  },

  pinPad: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 30,
    paddingHorizontal: 30,
  },

  pinLane: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  pinInput: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 15,
  },

  forgotButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },

  backspace: {
    fontSize: 32,
  },
})
