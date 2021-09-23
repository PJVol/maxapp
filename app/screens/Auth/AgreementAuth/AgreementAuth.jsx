import React from 'react'
import { Text, Keyboard, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { PreviousNextView } from 'react-native-keyboard-manager'
import PropTypes from 'prop-types'
import { strings, logInfo } from '../../../utils'
import { Colors } from '../../../config'
import { Button, TextInput, AuthPage } from '../../../components'
import { Routes } from '../../../config'
import styles from './styles'
import { AUTHENTICATE } from '../../../store'

class AgreementAuth extends React.Component {
  _didFocusSubscription
  _willBlurSubscription

  static propTypes = {
    navigation: PropTypes.object,
    authenticate: PropTypes.func,
  }

  state = {
    agreement: '',
    password: '',
  }

  componentDidMount() {
    logInfo(this.constructor.name + ' did mount')

    this._didFocusSubscription = this.props.navigation.addListener('didFocus', () => this._agreementInput.focus())
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', () => Keyboard.dismiss())
  }

  componentWillUnmount() {
    logInfo(this.constructor.name + ' will unmount')

    this._didFocusSubscription && this._didFocusSubscription.remove()
    this._willBlurSubscription && this._willBlurSubscription.remove()
  }

  handleSubmit = () => {
    Keyboard.dismiss()
    this._agreementInput.suppressError()
    this._passInput.suppressError()
    if (this.state.agreement.length === 0) {
      this._agreementInput.showError()
      this._passInput.showError()
      return
    }
    if (this.state.password.length === 0) {
      this._passInput.showError()
      return
    }

    this.props.authenticate(this.state.agreement, this.state.password)

    this.props.navigation.navigate(Routes.PinPadAuth)
    this.setState({ agreement: '', password: '' })
  }

  usernameNext = () => {
    this._agreementInput.suppressError()
    this._passInput.suppressError()
    if (this.state.agreement.length === 0) {
      setTimeout(() => {
        this._agreementInput.focus()
      }, 100)
      return
    }
    this._passInput.focus()
  }

  render() {
    return (
      <AuthPage title={strings('LOGIN_TITLE')}>
        <PreviousNextView style={styles.form}>
          <Text style={styles.label}>{strings('AGREEMENT_LABEL')}</Text>
          <TextInput
            returnKeyType="next"
            onSubmitEditing={this.usernameNext}
            textContentType="username"
            autoComplete="username"
            placeholder={strings('AGREEMENT_INPUT')}
            ref={ref => (this._agreementInput = ref)}
            normalBorder={Colors.WHITE_BACKGROUND}
            focusedBorder={Colors.INPUT_FOCUS}
            style={styles.formInput}
            keyboardType="number-pad"
            onChangeText={agreement => this.setState({ agreement })}
            value={this.state.agreement === '' ? null : this.state.agreement}
          />

          <Text style={[styles.label, styles.formSpacing]}>{strings('PASS_LABEL')}</Text>
          <TextInput
            clearTextOnFocus={true}
            returnKeyType="go"
            onSubmitEditing={this.handleSubmit}
            ref={ref => (this._passInput = ref)}
            textContentType="password"
            autoComplete="password"
            placeholder={strings('PASSWORD_INPUT')}
            secureTextEntry={true}
            normalBorder={Colors.WHITE_BACKGROUND}
            focusedBorder={Colors.INPUT_FOCUS}
            style={styles.formInput}
            onChangeText={password => this.setState({ password })}
            value={this.state.password === '' ? null : this.state.password}
          />

          <Button
            style={styles.button}
            onPress={this.handleSubmit}
            pressColor={Colors.BUTTON_PRESSED}
            backgroundColor={Colors.BUTTON_BACKGROUND}
            text={strings('LOGIN_LABEL')}
            textStyle={styles.buttonText}
          />
        </PreviousNextView>

        <TouchableOpacity
          testID="btnAgrToPhone"
          onPress={() => {
            requestAnimationFrame(() => {
              this._agreementInput.suppressError()
              this._passInput.suppressError()
              this.setState({ agreement: '', password: '' })
              this.props.navigation.navigate(Routes.PhoneAuth)
            })
          }}
          style={styles.bottomSwitcher}
        >
          <Text style={styles.bottomLabel}>{strings('LOGIN_SMS')}</Text>
        </TouchableOpacity>
      </AuthPage>
    )
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  push_token: state.status.push_token,
})
const mapDispatchToProps = dispatch => {
  return {
    authenticate: (id, pass) =>
      dispatch({
        type: AUTHENTICATE,
        payload: { id, pass, type: 'AGREEMENT' },
      }),
    dispatch,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AgreementAuth)
