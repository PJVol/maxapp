import React from 'react'
import { Text, View, Keyboard, AppState, Linking } from 'react-native'
import StyledText from 'react-native-styled-text'
import { connect } from 'react-redux'
import { PreviousNextView } from 'react-native-keyboard-manager'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import { strings, logInfo } from '../../../utils'
import { Page, TextInput, Button, ContactSupport } from '../../../components'
import { SET_BROWSER_STATUS, GET_AUTOPAYMENT_INFO, GET_BALANCE, PAY, ACTIVATE_PAY_CARD } from '../../../store'
import { Routes, Colors } from '../../../config'
import styles from './styles'
import { GET_MESSAGES } from '../../../store/messages/actions'

class PayService extends React.Component {
  state = {
    input: this.props.navigation.getParam('serviceName', '') === 'PAYCARD' ? '' : numeral(0),
    refreshing: false,
  }

  static propTypes = {
    navigation: PropTypes.object,
    browserEnabled: PropTypes.bool,
    setBrowserEnabled: PropTypes.func,
    getBalance: PropTypes.func,
    getAutopaymentInfo: PropTypes.func,
    payWithYandexMoney: PropTypes.func,
    payWithPlasticCard: PropTypes.func,
    payWithWebmoney: PropTypes.func,
    activatePaymentCard: PropTypes.func,
    paymentUrl: PropTypes.string,
    getMessages: PropTypes.func,
  }

  componentDidMount() {
    logInfo(this.constructor.name + ' did mount')

    this.props.getMessages()
    AppState.addEventListener('change', this._openBrowserHandler)
  }

  componentWillUnmount() {
    logInfo(this.constructor.name + ' will unmount')

    AppState.removeEventListener('change', this._openBrowserHandler)
  }

  componentDidUpdate(prevProps) {
    if (this.props.paymentUrl && prevProps.paymentUrl != this.props.paymentUrl) {
      Linking.openURL(this.props.paymentUrl)
      this.props.setBrowserEnabled(true)
    }
  }

  _topText = (serviceName, auto) => {
    let name
    switch (serviceName) {
      case 'PLASTICCARD':
        name = strings('ALFA_BANK')
        break
      case 'YA':
      case 'WEBMONEY':
        name = strings(serviceName)
        break
      case 'PAYCARD':
        return
    }

    if (auto) {
      return (
        <View>
          <StyledText style={styles.block_text}>
            {'<b>' + strings('ATTENTION') + '</b> ' + strings('PAYMENT_PROCESS_AUTO').replace('${system}', name)}
          </StyledText>
          <View style={styles.separator} />
        </View>
      )
    }
    return (
      <View>
        <StyledText style={styles.block_text}>
          {'<b>' + strings('ATTENTION') + '</b> ' + strings('PAYMENT_PROCESS').replace('${system}', name)}
        </StyledText>
        <View style={styles.separator} />
      </View>
    )
  }

  _inputLabel = (serviceName, auto) => {
    if (serviceName === 'PAYCARD') {
      return <Text style={styles.pin}>{strings('PIN')}</Text>
    }
    if (auto) {
      return <Text style={styles.amount}>{strings('SUM_AUTO')}</Text>
    }
    return <Text style={styles.amount}>{strings('SUM')}</Text>
  }

  _openBrowserHandler = nextAppState => {
    const auto = this.props.navigation.getParam('auto', false)
    if (nextAppState === 'active' && this.props.browserEnabled) {
      if (auto) {
        this.props.getAutopaymentInfo()
        this.props.getBalance()
        this.props.navigation.navigate(Routes.AutoPayment)
      } else {
        this.props.getBalance()
        this.props.navigation.navigate(Routes.Home)
      }
      this.props.setBrowserEnabled(false)
    }
  }

  _handlePress = (serviceName, auto) => {
    Keyboard.dismiss()
    this._input.suppressError()
    if (this.state.input.length === 0 || this.state.input.value() < 1) {
      this._input.showError()
      return
    }

    switch (serviceName) {
      case 'PLASTICCARD': {
        this.props.payWithPlasticCard(this.state.input.value(), auto)
        break
      }
      case 'YA': {
        this.props.payWithYandexMoney(this.state.input.value())
        break
      }
      case 'WEBMONEY': {
        this.props.payWithWebmoney(this.state.input.value())
        break
      }
      case 'PAYCARD': {
        this.props.activatePaymentCard(this.state.input)
        break
      }
    }
  }

  render() {
    const serviceName = this.props.navigation.getParam('serviceName', '')
    const auto = this.props.navigation.getParam('auto', false)

    const buttonText = auto
      ? strings('BIND_CARD')
      : serviceName === 'PAYCARD'
      ? strings('ACTIVATE_CARD')
      : strings('PROCESS_PAYMENT')

    return (
      <Page
        title={auto ? strings('ADD_CARD') : strings(serviceName)}
        refreshEnabled={true}
        refreshing={this.state.refreshing}
        onRefresh={() => {
          this.setState({ refreshing: true })
          this.props.getMessages()
          this.setState({ refreshing: false })
        }}
      >
        <PreviousNextView style={styles.contentBlock}>
          {this._topText(serviceName, auto)}
          {this._inputLabel(serviceName, auto)}

          <TextInput
            mask={serviceName === 'PAYCARD' ? null : 'money'}
            options={{
              precision: 2,
              separator: '.',
              delimiter: ' ',
              unit: '\u20BD ',
              suffixUnit: '',
            }}
            returnKeyType="go"
            onSubmitEditing={this._handlePress}
            autoFocus={true}
            ref={ref => (this._input = ref)}
            textContentType="oneTimeCode"
            placeholder={serviceName === 'PAYCARD' ? strings('PIN_INPUT') : strings('SUM_INPUT')}
            normalBorder={Colors.INPUT_BORDER}
            focusedBorder={Colors.INPUT_FOCUS}
            style={styles.input}
            keyboardType="decimal-pad"
            maxLength={serviceName === 'PAYCARD' ? 15 : 9}
            onChangeText={input => this.setState({ input: serviceName === 'PAYCARD' ? input : numeral(input) })}
            value={
              serviceName === 'PAYCARD'
                ? this.state.input === ''
                  ? null
                  : this.state.input
                : this.state.input.format()
            }
          />

          <Button
            style={styles.button}
            onPress={() => this._handlePress(serviceName, auto)}
            pressColor={Colors.BUTTON_PRESSED}
            backgroundColor={Colors.BUTTON_BACKGROUND}
            textStyle={styles.buttonText}
            text={buttonText}
          />
        </PreviousNextView>

        <ContactSupport style={styles.contactSupport} />
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  browserEnabled: state.status.browserOpened,
  paymentUrl: state.payment.paymentServiceUrl,
})
const mapDispatchToProps = dispatch => {
  return {
    setBrowserEnabled: status => dispatch({ type: SET_BROWSER_STATUS, payload: { status } }),
    getBalance: () => dispatch({ type: GET_BALANCE }),
    getAutopaymentInfo: () => dispatch({ type: GET_AUTOPAYMENT_INFO }),
    payWithYandexMoney: amount => dispatch({ type: PAY, payload: { amount, service: 'YANDEX' } }),
    payWithPlasticCard: amount => dispatch({ type: PAY, payload: { amount, service: 'PLASTICCARD' } }),
    payWithWebmoney: amount => dispatch({ type: PAY, payload: { amount, service: 'WEBMONEY' } }),
    activatePaymentCard: pin => {
      dispatch({ type: ACTIVATE_PAY_CARD, payload: { pin } })
    },
    getMessages: () => dispatch({ type: GET_MESSAGES }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PayService)
