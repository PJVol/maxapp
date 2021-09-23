import React from 'react'
import { Image } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { Pinpad } from '../../screens'
import { Logout } from '../../components'
import { maxnetLogoWhite } from '../../assets'
import { Routes } from '../../config'
import styles from './styles'

export default createStackNavigator(
  {
    Pin: {
      screen: Pinpad,
      route: Routes.PinPad,
    },
  },
  {
    defaultNavigationOptions: () => ({
      headerLeft: <Logout />,
      headerStyle: styles.header,
      headerTitleStyle: styles.title,
      headerTitleContainerStyle: styles.titleContainer,
      headerLeftContainerStyle: styles.leftContainer,
      gesturesEnabled: false,
      headerTitle: <Image source={maxnetLogoWhite} />,
    }),
    headerMode: 'float',
    headerLayoutPreset: 'center',
  },
)
