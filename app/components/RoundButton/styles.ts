import { Platform, StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    paddingVertical: Platform.OS === 'android' ? 5 : 0,
    paddingHorizontal: Platform.OS === 'android' ? 5 : 0,
  },
  roundButton: {
    height: 36,
    width: 36,
    borderRadius: 18,
  },
})
