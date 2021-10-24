import React from 'react'
import { createAppContainer, StackActions } from 'react-navigation'
import { AppState, Platform, Linking } from 'react-native'
import { Provider } from 'react-redux'
import DeviceInfo from 'react-native-device-info'
import SplashScreen from 'react-native-splash-screen'
import GlobalFont from 'react-native-global-font'
import * as RNLocalize from 'react-native-localize'
import { useScreens } from 'react-native-screens'
import NetInfo from '@react-native-community/netinfo'
import MessageBarAlert from 'react-native-message-bar/MessageBar'
import MessageBarManager from 'react-native-message-bar/MessageBarManager'
import { Sentry } from 'react-native-sentry'
import { strings, logError, showMessageBar, logInfo, registerNumeralInfo } from './app/utils'
import store, { SET_CONNECTION_STATUS } from './app/store'
import { AppStack } from './app/navigators'
import { Loader } from './app/components'
import { API, PushNotifications } from './app/services'
import { setI18nConfig } from './app/translation'

Sentry.config('https://a4606b8188a74d499acee6827a6714c4@sentry.io/1444231').install()

useScreens()
const AppContainer = createAppContainer(AppStack)

registerNumeralInfo()

export default class App extends React.Component {
  state = {
    appState: AppState.currentState,
  }

  constructor() {
    super()
    setI18nConfig()

    let fontName = 'Roboto'
    GlobalFont.applyGlobal(fontName)

    if (Platform.OS === 'android') {
      this._handleAppLaunchUrl()
    }

    store.subscribe(() => {
      let isConnected = store.getState().status.isConnected
      let messageShown = store.getState().status.messageShown
      if (!isConnected && !messageShown) {
        showMessageBar(strings('NO_INTERNET'), 'error', false)
      }
      if (messageShown && isConnected) {
        MessageBarManager.hideAlert()
      }

      let token = store.getState().auth.token
      let isLoggedIn = store.getState().status.isLoggedIn

      if (this._navigation) {
        let nav = this._navigation.state.nav
        let currentStack = nav.routes[nav.routes.length - 1]
        let currentScreen = currentStack.routes[currentStack.routes.length - 1]

        if (
          currentStack.routeName === 'Auth' &&
          (currentScreen.routeName === 'AgreementAuth' || currentScreen.routeName === 'PhoneAuth')
        ) {
          if (token && isLoggedIn) {
            this._navigation.dispatch(StackActions.push({ routeName: 'Pinpad' }))
          }
          setTimeout(() => {
            SplashScreen.hide()
          }, 1000)
        }
      }

      if (token && isLoggedIn) {
        let agreement = store.getState().info.agreement
        if (agreement) {
          Sentry.setExtraContext({
            deviceID: DeviceInfo.getUniqueID(),
            token: token,
            agreement: agreement,
          })
        } else {
          Sentry.setExtraContext({
            deviceID: DeviceInfo.getUniqueID(),
            token: token,
          })
        }
      } else {
        Sentry.setExtraContext({ deviceID: DeviceInfo.getUniqueID() })
      }

      if (token) {
        if (API.client.defaults.headers.common['Authorization'] !== `Bearer ${token}`) {
          API.client.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
      } else {
        if (API.client.defaults.headers.common['Authorization']) {
          delete API.client.defaults.headers.common['Authorization']
        }
      }
    })

    if (!(DeviceInfo.isEmulator() && Platform.OS === 'ios')) {
      PushNotifications.registerPushNotifications()
    }
  }

  componentDidMount() {
    logInfo(this.constructor.name + ' did mount')

    this._stateHandler = AppState.addEventListener('change', this._handleAppStateChange)
    this._localeHandler = RNLocalize.addEventListener('change', this._handleLocalizationChange)
    this._urlOpenHandler = Linking.addEventListener('url', this._handleOpenURL)
    this._connectionStatusHandler = NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectionChange,
    )
    MessageBarManager.registerMessageBar(this._alert)
  }

  componentWillUnmount() {
    logInfo(this.constructor.name + ' will unmount')

    this._stateHandler && this._stateHandler.remove()
    this._localeHandler && this._localeHandler.remove()
    this._urlOpenHandler && this._urlOpenHandler
    this._connectionStatusHandler && this._connectionStatusHandler.remove()
    PushNotifications.unregisterPushNotifications()
    MessageBarManager.unregisterMessageBar()
  }

  _handleConnectionChange = isConnected => {
    store.dispatch({ type: SET_CONNECTION_STATUS, payload: { isConnected } })
  }

  _handleLocalizationChange = () => {
    setI18nConfig()
    this.forceUpdate()
  }

  _handleAppLaunchUrl = async () => {
    try {
      let url = await Linking.getInitialURL()
      this._handleUrl(url)
    } catch (err) {
      logError(err)
    }
  }

  _handleOpenURL = event => {
    this._handleUrl(event.url)
  }

  _handleUrl(url) {
    if (!url) {
      return
    }
    logInfo('Handled URL ' + url)

    if (url.toString().indexOf('payment?success')) {
      console.info('Payment success')
    }
  }

  _handleAppStateChange = nextAppState => {
    logInfo('App state ' + nextAppState)

    let timeout

    if (nextAppState === 'background') {
      timeout = setTimeout(() => {
        let browserOpened = store.getState().status.browserOpened

        if (!browserOpened && this._navigation) {
          let currentRoute = this._navigation.state.nav.routes[this._navigation.state.nav.routes.length - 1]
          if (
            (currentRoute.routeName != 'Auth' && currentRoute.routeName != 'PinpadMain') ||
            currentRoute.routes[currentRoute.routes.length - 1].routeName === 'AgreementSelection'
          ) {
            this._navigation.dispatch(StackActions.push({ routeName: 'PinpadMain' }))
          }
        }
      }, 60 * 1000)
    }

    if (nextAppState === 'active') {
      clearTimeout(timeout)
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Loader />
        <AppContainer ref={ref => (this._navigation = ref)} />

        <MessageBarAlert ref={ref => (this._alert = ref)} />
      </Provider>
    )
  }
}
