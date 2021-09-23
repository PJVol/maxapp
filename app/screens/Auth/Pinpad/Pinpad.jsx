import React from 'react'
import { Text, BackHandler, View, Alert, Dimensions, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Biometric from 'react-native-touch-id'
import PropTypes from 'prop-types'
import { strings, logError, logInfo } from '../../../utils'
import { AuthPage, PinPad, PinInput } from '../../../components'
import { LOGOUT } from '../../../store'
import { Routes } from '../../../config'
import styles from './styles'

class Pinpad extends React.Component {
  _didFocusSubscription
  _willBlurSubscription

  state = {
    pin: '',
    pinCheck: '',
    pinSetup: true,
    pinError: false,
    biometryType: '',
    biometryAvailable: false,
    orientation: '',
  }

  static propTypes = {
    navigation: PropTypes.object,
    logout: PropTypes.func,
    pin: PropTypes.string,
    pinLength: PropTypes.number,
    setPin: PropTypes.func,
    useBiometric: PropTypes.bool,
    currentAgreement: PropTypes.number,
  }

  getOrientation = () => {
    if (Dimensions.get('window').width < Dimensions.get('window').height) {
      this.setState({ orientation: 'portrait' })
    } else {
      this.setState({ orientation: 'landscape' })
    }
  }

  constructor(props) {
    super(props)

    this._didFocusSubscription = props.navigation.addListener('didFocus', () => {
      this._backHandler = BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)

      this._orientationChange = Dimensions.addEventListener('change', () => {
        this.getOrientation()
      })

      if (Platform.OS === 'ios') {
        this.biometricAuth()
      }
    })
  }

  componentDidMount() {
    logInfo(this.constructor.name + ' did mount')

    this.getOrientation()

    this._willBlurSubscription = this.props.navigation.addListener('willBlur', () => {
      this._backHandler && this._backHandler.remove()
      this._orientationChange && this._orientationChange.remove()
    })
  }

  componentWillUnmount() {
    logInfo(this.constructor.name + ' will unmount')

    this._didFocusSubscription && this._didFocusSubscription.remove()
    this._willBlurSubscription && this._willBlurSubscription.remove()
  }

  onBackButtonPressAndroid = () => {
    BackHandler.exitApp()
    return true
  }

  componentDidUpdate() {
    if (this.props.pin && this.state.pinSetup) {
      this.setState({ pinSetup: false })
    }
    if (this.state.pin.length === this.props.pinLength) {
      if (this.state.pinSetup && this.state.pinCheck == '') {
        setTimeout(() => {
          this.setState({ pinCheck: this.state.pin, pin: '', pinError: false })
        }, 100)
        return
      }
      if (this.state.pinSetup) {
        if (this.state.pinCheck === this.state.pin) {
          this.setState({ pinSetup: false })
          setTimeout(() => {
            this.props.setPin(this.state.pin)
            this.setState({ pin: '', pinCheck: '' })
            this.unlockApp()
          }, 100)
          return
        }
        setTimeout(() => {
          this.setState({ pin: '', pinCheck: '', pinError: true })
        }, 100)
        return
      }
      if (this.state.pin === this.props.pin) {
        setTimeout(() => {
          this.setState({ pin: '', pinError: false })
          this.unlockApp()
        }, 100)
        return
      }
      setTimeout(() => {
        this.setState({ pin: '', pinError: true })
      }, 100)
    }
  }

  //TODO: Move Biometry logic into PinPad component
  biometricAuth = () => {
    if (!this.props.useBiometric || !this.props.pin) {
      return
    }
    requestAnimationFrame(async () => {
      try {
        const optionalConfigObject = {
          title: '',
          sensorDescription: strings('BIOMETRIC_SENSOR'),
          sensorErrorDescription: strings('BIOMETRIC_FAILED'),
          imageColor: '#00000000',
          imageErrorColor: '#ff000030',
          cancelText: strings('BIOMETRIC_CANCEL'),
          unifiedErrors: false,
          passcodeFallback: false,
        }

        let biometryType = await Biometric.isSupported(optionalConfigObject)
        if (Platform.OS === 'ios') {
          this.setState({ biometryType, biometryAvailable: true })
        } else {
          this.setState({
            biometryType: 'Android Touch',
            biometryAvailable: biometryType,
          })
        }

        let reason =
          Platform.OS === 'android'
            ? strings('BIOMETRIC_REASON').replace('${biometric_name}', strings('BIOMETRIC_SENSOR'))
            : strings('BIOMETRIC_REASON').replace('${biometric_name}', biometryType)

        let success = await Biometric.authenticate(reason, optionalConfigObject)
        if (success) {
          this.unlockApp()
        }
      } catch (err) {
        logError(err)
      }
    })
  }

  unlockApp = () => {
    if (this.props.currentAgreement) {
      this.props.navigation.navigate(Routes.MainNavigator)
    } else {
      this.props.navigation.navigate(Routes.AgreementSelection)
    }
  }

  _handlePinPress = key => {
    requestAnimationFrame(() => {
      this.setState({
        pin: this.state.pin + key,
        pinError: false,
      })
    })
  }

  _topText() {
    if (this.props.pin && !this.state.pinError) {
      return strings('ENTER_PIN')
    }
    if (this.state.pinCheck.length === 4 && this.state.pinSetup) {
      return strings('REENTER_PIN')
    }
    if (this.state.pinSetup && this.state.pinError) {
      return strings('WRONG_PIN_TRY')
    }
    if (this.state.pinSetup) {
      return strings('SET_PIN')
    }
    if (this.state.pinError) {
      return strings('WRONG_PIN')
    }
    return strings('SET_PIN')
  }

  _renderBottomButton = () => {
    if (this.props.pin) {
      return (
        <View style={styles.forgotButton}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                strings('FORGOT_PIN'),
                strings('FORGOT_PIN_TEXT'),
                [
                  {
                    text: strings('OK'),
                    onPress: () => {
                      this.props.logout(() => {
                        this.props.navigation.navigate(Routes.AgreementAuth)
                      })
                    },
                  },
                ],
                { cancelable: false },
              )
            }}
          >
            <Text style={styles.forgotText}>{strings('FORGOT_PIN')}</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  render() {
    return (
      <AuthPage scrollEnabled={this.state.orientation === 'portrait' ? false : true}>
        <Text style={styles.topText}>{this._topText()}</Text>

        <PinInput pinLength={this.props.pinLength} enteredLength={this.state.pin.length} />

        <PinPad
          onKeyPress={this._handlePinPress}
          onBackspacePress={() => {
            this.setState({
              pin: this.state.pin.substring(0, this.state.pin.length - 1),
            })
          }}
          onBiometryInit={this.biometricAuth}
          biometryType={this.state.biometryType}
          biometryAvailable={this.state.biometryAvailable}
        />

        {this._renderBottomButton()}
      </AuthPage>
    )
  }
}

const mapStateToProps = state => ({
  currentAgreement: state.info.agreement,
  pin: state.auth.pin,
  useBiometric: state.auth.useBiometric,
  usePin: state.auth.usePin,
  pinLength: state.auth.pinLength,
})
const mapDispatchToProps = dispatch => {
  return {
    logout: callback => dispatch({ type: LOGOUT, payload: { callback } }),
    setPin: pin => dispatch({ type: 'SET_PIN', payload: { pin } }),
    dispatch,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pinpad)
