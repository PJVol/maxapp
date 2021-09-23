import React from 'react'
import { Image } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { fadeIn, fromRight } from 'react-navigation-transitions'
import { AgreementAuth, AgreementSelect, PhoneAuth, Pinpad } from '../../screens'
import { Logout } from '../../components'
import { maxnetLogoWhite } from '../../assets'
import { Routes } from '../../config'
import styles from './styles'

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2]
  const nextScene = scenes[scenes.length - 1]

  if (
    (prevScene &&
      prevScene.route.routeName === Routes.AgreementAuth &&
      nextScene.route.routeName === Routes.PhoneAuth) ||
    (prevScene && prevScene.route.routeName === Routes.PhoneAuth && nextScene.route.routeName === Routes.AgreementAuth)
  ) {
    return fadeIn(200)
  }
  return fromRight(200)
}

export default createStackNavigator(
  {
    AgreementAuth: {
      screen: AgreementAuth,
      route: Routes.AgreementAuth,
    },
    PhoneAuth: {
      screen: PhoneAuth,
      route: Routes.PhoneAuth,
    },
    Pinpad: {
      screen: Pinpad,
      route: Routes.PinPadAuth,
      navigationOptions: () => ({ headerLeft: <Logout /> }),
    },
    AgreementSelection: {
      screen: AgreementSelect,
      route: Routes.AgreementSelection,
      navigationOptions: () => ({ headerLeft: <Logout /> }),
    },
  },
  {
    defaultNavigationOptions: () => ({
      headerStyle: styles.header,
      headerTitleStyle: styles.title,
      headerLeft: null,
      headerTitleContainerStyle: styles.titleContainer,
      headerLeftContainerStyle: styles.leftContainer,
      gesturesEnabled: false,
      headerTitle: <Image style={styles.logo} source={maxnetLogoWhite} />,
    }),
    transitionConfig: nav => handleCustomTransition(nav),
    headerMode: 'float',
    headerLayoutPreset: 'center',
  },
)
