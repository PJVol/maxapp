import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../config'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.PRIMARY,
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: Fonts.MEDIUM,
    color: Colors.WHITE_TEXT,
    textAlign: 'center',
    marginTop: 20,
  },

  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 70,
    backgroundColor: Colors.PRIMARY,
  },
})
