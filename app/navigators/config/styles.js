import { Platform, StatusBar, StyleSheet } from 'react-native'
import { Colors } from '../../config'
import { constants } from '../../utils'

export default StyleSheet.create({
  back: {
    marginVertical: 5,
    marginHorizontal: 5,
  },

  menu: {
    marginLeft: 10,
  },

  bell: {
    marginRight: 10,
  },

  backIcon: {
    fontSize: 22,
  },

  menuIcon: {
    fontSize: 22,
  },

  bellIcon: {
    fontSize: 22,
  },

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
    ...(Platform.OS === 'android'
      ? {
          height: 50,
          width: 50,
          textAlign: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
        }
      : {
          paddingVertical: 5,
          paddingHorizontal: 5,
        }),
  },

  rightContainer: {
    marginRight: 5,
    ...(Platform.OS === 'android'
      ? {
          height: 50,
          width: 50,
          textAlign: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
        }
      : {
          paddingVertical: 5,
          paddingHorizontal: 5,
        }),
  },

  header: {
    backgroundColor: Colors.WHITE_BACKGROUNDs,
    ...Platform.select({
      ios: {
        borderBottomColor: Colors.BORDER,
        borderBottomWidth: 2,
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
