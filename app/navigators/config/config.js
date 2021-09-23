import React from 'react'
import { Platform, Dimensions, Image } from 'react-native'
import { fromRight } from 'react-navigation-transitions'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import { RoundButton, Badged } from '../../components'
import { connect } from 'react-redux'
import { strings } from '../../utils'
import { Colors, Routes } from '../../config'
import { maxnetLogo } from '../../assets'
import styles from './styles'

export const config = {
  defaultNavigationOptions: ({ navigation }) => {
    const BadgedIcon = connect(state => ({
      value: state.messages.unread,
    }))(Badged({ WrappedComponent: FontAwesome5Pro }))

    return {
      headerStyle: styles.header,
      headerTitleStyle: styles.title,
      headerTitleContainerStyle: styles.titleContainer,
      headerLeftContainerStyle: styles.leftContainer,
      ...(Platform.OS === 'android'
        ? {
            headerLeft: (
              <RoundButton
                containerStyle={styles.back}
                onPress={() => navigation.goBack()}
                icon={<FontAwesome5Pro style={styles.backIcon} name="chevron-left" color={Colors.TOP_BAR_ICON} />}
              />
            ),
          }
        : ''),
      headerRight: (
        <RoundButton
          containerStyle={styles.bell}
          onPress={() => navigation.navigate(Routes.Messages)}
          icon={<BadgedIcon style={styles.bellIcon} name="bell" color={Colors.TOP_BAR_ICON} />}
        />
      ),
      headerRightContainerStyle: styles.rightContainer,
      headerTitle: <Image source={maxnetLogo} style={styles.logo} />,
      headerPressColorAndroid: Colors.MAIN_BACKGROUND,
      headerBackTitle: strings('BACK'),
      gesturesEnabled: true,
      gestureResponseDistance: {
        horizontal: Dimensions.get('window').width,
      },
    }
  },
  navigationOptions: ({ navigation }) => ({
    drawerLockMode: navigation.state.index > 0 ? 'locked-closed' : 'unlocked',
  }),
  headerMode: 'float',
  headerLayoutPreset: 'center',
  transitionConfig: () => fromRight(200),
}

export const drawerMenuConfig = ({ navigation }) => ({
  headerLeft: (
    <RoundButton
      containerStyle={styles.menu}
      onPress={() => navigation.openDrawer()}
      icon={<FontAwesome5Pro style={styles.menuIcon} name="bars" color={Colors.TOP_BAR_ICON} />}
    />
  ),
})
