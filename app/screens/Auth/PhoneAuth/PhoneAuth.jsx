import React from 'react'
import { View, Text, BackHandler, Keyboard, Platform, TouchableOpacity } from 'react-native'
import { PreviousNextView } from 'react-native-keyboard-manager'
import { connect } from 'react-redux'
import SmsListener from 'react-native-android-sms-listener'
import PropTypes from 'prop-types'
import { strings, logError, logInfo } from '../../../utils'
import { Button, TextInput, AuthPage } from '../../../components'
import { AUTHENTICATE, SMS_CODE, RESET_SMS } from '../../../store'
import { Routes, Colors } from '../../../config'
import { AsYouType } from 'libphonenumber-js'

import styles from './styles'

class PhoneAuth extends React.Component {
  _didFocusSubscription
  _willBlurSubscription

  _codeInput = React.createRef()
  _phoneInput = React.createRef()

  static propTypes = {
    navigation: PropTypes.object,
    authenticate: PropTypes.func,
    sendCode: PropTypes.func,
    timeout: PropTypes.number,
    codeSent: PropTypes.bool,
    changePhone: PropTypes.func,
  }

  state = {
    phone: '',
    code: '',
  }

  constructor(props) {
    super(props)
    this._didFocusSubscription = props.navigation.addListener('didFocus', () => {
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
      this._smsListener = SmsListener.addListener(message => {
        if (message.originatingAddress != 'maxnet') {
          return
        }
        let code = message.body.match(/\d{6}/g)[0]
        this.setState({ code })
        this.handleSubmit()
      })
    })
  }

  componentDidMount() {
    logInfo(this.constructor.name + ' did mount')

    this._willBlurSubscription = this.props.navigation.addListener('willBlur', () => {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
      this._smsListener.remove()
    })
    if (Platform.OS === 'android') {
      this.requestReadSmsPermission()
    }
  }

  componentWillUnmount() {
    logInfo(this.constructor.name + ' will unmount')

    this._didFocusSubscription && this._didFocusSubscription.remove()
    this._willBlurSubscription && this._willBlurSubscription.remove()
    clearInterval(this.interval)
  }

  componentDidUpdate(prevProps) {
    if (this.props.codeSent != prevProps.codeSent) {
      if (this.props.codeSent) {
        this._codeInput.current.focus()
      } else {
        this._phoneInput.current.focus()
      }
    }
  }

  async requestReadSmsPermission() {
    try {
      const { PermissionsAndroid } = require('react-native')

      var granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_SMS, {
        title: strings('AUTO_OTP_TITLE'),
        message: strings('AUTO_OTP'),
      })
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECEIVE_SMS, {
          title: strings('RECEIVE_SMS_TITLE'),
          message: strings('RECEIVE_SMS'),
        })
      }
    } catch (err) {
      logError(err)
    }
  }

  onBackButtonPressAndroid = () => {
    if (this.props.codeSent) {
      this.props.changePhone()
    } else {
      BackHandler.exitApp()
    }
    return true
  }

  handleSubmit = () => {
    if (this.props.timeout > 0) {
      this.setState({
        phone: '',
        code: '',
      })
      this.props.changePhone()
      return
    }

    Keyboard.dismiss()
    if (this._codeInput.current) {
      this._codeInput.current.suppressError()
    }
    this._phoneInput.current.suppressError()

    if (this.props.codeSent) {
      this.props.authenticate(this._getRawPhone(), this.state.code)
      this.props.navigation.navigate(Routes.PinPadAuth)
      this.setState({ phone: '', code: '' })
    } else {
      if (this._getRawPhone().length !== 11) {
        this._phoneInput.current.showError()
        return
      }
      this.props.sendCode(this._getRawPhone())
    }
  }

  handleUnderformSwitcher = () => {
    requestAnimationFrame(() => {
      if (this.props.codeSent) {
        clearInterval(this.interval)
        this.setState({
          phone: '',
          code: '',
        })
        this.props.changePhone()
      } else {
        this.props.navigation.navigate(Routes.AgreementAuth)
      }
      this.setState({ phone: '', code: '' })
    })
  }

  _renderCode() {
    if (this.props.codeSent) {
      return (
        <View>
          <Text style={[styles.label, styles.formSpacing]}>{strings('CODE_LABEL')}</Text>
          <TextInput
            ref={this._codeInput}
            returnKeyType="go"
            onSubmitEditing={this.handleSubmit}
            textContentType="oneTimeCode"
            placeholder={strings('CODE_INPUT')}
            normalBorder={Colors.WHITE_BACKGROUND}
            focusedBorder={Colors.INPUT_FOCUS}
            style={styles.formInput}
            keyboardType="number-pad"
            maxLength={6}
            onChangeText={code => this.setState({ code })}
            value={this.state.code === '' ? null : this.state.code}
          />
        </View>
      )
    }
  }

  _renderUnderformSwitcherText() {
    if (this.props.codeSent) {
      return <Text style={styles.switcherText}>{strings('ANOTHER_PHONE')}</Text>
    } else {
      return <Text style={styles.switcherText}>{strings('LOGIN_AGREEMENT')}</Text>
    }
  }

  _handlePhoneChange = phone => {
    let formattedPhone = phone[0] === '8' || phone[0] === '7' ? `+7${phone.slice(1)}` : phone
    formattedPhone =
      formattedPhone.length && formattedPhone[0] !== '+' && formattedPhone[0] !== '7'
        ? `+7${formattedPhone}`
        : formattedPhone
    formattedPhone = new AsYouType('RU').input(formattedPhone.replace(/[^\d+]/g, ''))
    this.setState({ phone: formattedPhone })
  }

  _getRawPhone = () => this.state.phone.replace(/\s/g, '').slice(1)

  render() {
    const buttonText = this.props.codeSent
      ? strings('LOGIN_LABEL')
      : this.props.timeout > 0
      ? strings('ANOTHER_PHONE')
      : strings('SEND_CODE')

    return (
      <AuthPage title={strings('LOGIN_TITLE')}>
        <PreviousNextView style={styles.form}>
          <Text style={styles.label}>{strings('PHONE_LABEL')}</Text>

          <TextInput
            returnKeyType="send"
            onSubmitEditing={this.handleSubmit}
            editable={!this.props.codeSent && this.props.timeout === 0}
            autoFocus={true}
            textContentType="telephoneNumber"
            autoComplete="tel"
            normalBorder={Colors.WHITE_BACKGROUND}
            focusedBorder={Colors.INPUT_FOCUS}
            style={styles.formInput}
            keyboardType="phone-pad"
            maxLength={16}
            ref={this._phoneInput}
            onChangeText={this._handlePhoneChange}
            placeholder="7 999 999 99 99"
            value={this.state.phone === '' ? null : this.state.phone}
          />

          <Text numberOfLines={1} style={this.props.timeout > 0 ? styles.timeoutShow : styles.timeoutHide}>
            {strings('TIMEOUT_ERROR').replace('${seconds}', this.props.timeout)}
          </Text>

          <View>{this._renderCode()}</View>

          <Button
            onPress={this.handleSubmit}
            style={this.props.timeout > 0 ? styles.buttonMarginSmall : styles.buttonMargin}
            pressColor={Colors.BUTTON_PRESSED}
            backgroundColor={Colors.BUTTON_BACKGROUND}
            textStyle={styles.buttonText}
            text={buttonText}
          />
        </PreviousNextView>

        <TouchableOpacity onPress={this.handleUnderformSwitcher} style={styles.switcher}>
          {this._renderUnderformSwitcherText()}
        </TouchableOpacity>
      </AuthPage>
    )
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  push_token: state.status.push_token,
  timeout: state.auth.timeout,
  codeSent: state.auth.codeSent,
})
const mapDispatchToProps = dispatch => {
  return {
    authenticate: (id, pass) => dispatch({ type: AUTHENTICATE, payload: { id, pass, type: 'PHONE' } }),
    sendCode: phone => dispatch({ type: SMS_CODE, payload: { phone } }),
    changePhone: () => dispatch({ type: RESET_SMS }),
    dispatch,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhoneAuth)
