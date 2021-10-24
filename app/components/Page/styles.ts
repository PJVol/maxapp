import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../config'

export default StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 70,
    backgroundColor: Colors.MAIN_BACKGROUND,
  },
  title: {
    fontSize: 22,
    fontWeight: Fonts.MEDIUM,
    marginTop: 20,
    textAlign: 'center',
  },
  background: {
    backgroundColor: Colors.MAIN_BACKGROUND,
    flex: 1,
  },
})
