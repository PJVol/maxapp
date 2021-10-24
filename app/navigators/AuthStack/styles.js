import { Platform, StatusBar, StyleSheet } from 'react-native'
import { Colors } from '../../config'
import { constants } from '../../utils'

export default StyleSheet.create({
  title: {
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  titleContainer: {
    marginBottom: Platform.OS === 'ios' ? 15 : 10,
  },

  leftContainer: {
    marginLeft: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },

  header: {
    backgroundColor: Colors.PRIMARY,
    borderBottomColor: Colors.LIGHT_BORDER,
    borderBottomWidth: 2,
    ...Platform.select({
      ios: {
        height: 50,
      },
      android: {
        paddingTop: Platform.Version > constants.ANDROID_VERSION_KITKAT ? StatusBar.currentHeight : 10,
        height: 50 + (Platform.Version > constants.ANDROID_VERSION_KITKAT ? StatusBar.currentHeight : 10),
      },
    }),
  },

  logo: {
    height: 140,
    width: 140,
    resizeMode: 'stretch',
  },
})
