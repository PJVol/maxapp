import { StyleSheet } from 'react-native'
import { Colors } from '../../config'

export default StyleSheet.create({
  disabled: {
    backgroundColor: Colors.WHITE_BACKGROUND,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5,
  },

  enabled: {
    opacity: 0,
  },

  container: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: Colors.WHITE_BACKGROUND,
    paddingLeft: 10,
    borderWidth: 2,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    flex: 1,
  },

  errorIconShown: {
    marginRight: 10,
    opacity: 1,
    fontSize: 18,
  },

  errorIcoHidden: {
    marginRight: 0,
    opacity: 0,
    fontSize: 0,
  },
})
