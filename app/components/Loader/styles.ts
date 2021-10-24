import { StyleSheet } from 'react-native'
import { Colors } from '../../config'

export default StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#00000070',
  },
  loadingText: {
    color: Colors.WHITE_TEXT,
    fontSize: 22,
    marginTop: 7,
  },
})
