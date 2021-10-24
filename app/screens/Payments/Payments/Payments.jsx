import React from 'react'
import { View, Text, Platform, BackHandler, TouchableHighlight, TouchableNativeFeedback } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import { strings, logInfo, constants } from '../../../utils'
import { ContactSupport, Page } from '../../../components'
import { PaymentMethodsContainer } from '../../../containers'
import { Routes, Colors } from '../../../config'
import styles from './styles'
import { GET_PAYMENT_METHODS, GET_AUTOPAYMENT_INFO } from '../../../store'
import { GET_MESSAGES } from '../../../store/messages/actions'

class Payments extends React.Component {
  _didFocusSubscription
  _willBlurSubscription

  static propTypes = {
    navigation: PropTypes.object,
    autopaymentEnabled: PropTypes.bool,
    paymentMethods: PropTypes.array,
    getAvailablePaymentMethods: PropTypes.func,
    getAutopaymentInfo: PropTypes.func,
    getMessages: PropTypes.func,
  }

  state = {
    refreshing: false,
  }

  constructor(props) {
    super(props)
    this._didFocusSubscription = props.navigation.addListener('didFocus', () => {
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    })
  }

  componentWillMount() {
    this.updatePaymentInfo()
    this.props.getMessages()
  }

  componentDidMount() {
    logInfo(this.constructor.name + ' did mount')

    this._willBlurSubscription = this.props.navigation.addListener('willBlur', () =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid),
    )
  }

  componentWillUnmount() {
    logInfo(this.constructor.name + ' will unmount')

    this._didFocusSubscription && this._didFocusSubscription.remove()
    this._willBlurSubscription && this._willBlurSubscription.remove()
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.navigate(Routes.Home)
    return true
  }

  updatePaymentInfo = () => {
    this.props.getAvailablePaymentMethods()
    this.props.getAutopaymentInfo()
  }

  _renderContent = item => {
    return (
      <View style={styles.item}>
        {item}
        <FontAwesome5Pro style={styles.icon} name="chevron-right" color={Colors.TOP_BAR_ICON} />
      </View>
    )
  }

  _renderItem = (item, callback) => {
    if (Platform.OS === 'android' && Platform.Version >= constants.ANDROID_VERSION_LOLLIPOP) {
      return (
        <TouchableNativeFeedback
          onPress={callback}
          delayPressIn={0}
          background={TouchableNativeFeedback.Ripple(Colors.DARK_PRESSED, false)}
        >
          {this._renderContent(item)}
        </TouchableNativeFeedback>
      )
    } else {
      return (
        <TouchableHighlight underlayColor={Colors.DARK_PRESSED} onPress={callback}>
          {this._renderContent(item)}
        </TouchableHighlight>
      )
    }
  }

  render() {
    return (
      <Page
        title={strings('MENU_PAYMENTS')}
        refreshEnabled={true}
        refreshing={this.state.refreshing}
        onRefresh={() => {
          this.setState({ refreshing: true })
          this.updatePaymentInfo()
          this.props.getMessages()
          this.setState({ refreshing: false })
        }}
      >
        <PaymentMethodsContainer
          paymentMethods={this.props.paymentMethods}
          autopaymentEnabled={this.props.autopaymentEnabled}
        />

        <View style={styles.contentBlock}>
          {this._renderItem(<Text style={styles.block_text}>{strings('PAYMENT_HISTORY')}</Text>, () => {
            this.props.navigation.navigate(Routes.PaymentsHistory)
          })}
        </View>

        <ContactSupport style={styles.contactSupport} />
      </Page>
    )
  }
}
const mapStateToProps = state => ({
  paymentMethods: state.payment.paymentTypes,
  autopaymentEnabled: state.payment.autopaymentEnabled,
})
const mapDispatchToProps = dispatch => {
  return {
    getAvailablePaymentMethods: () => dispatch({ type: GET_PAYMENT_METHODS }),
    getAutopaymentInfo: () => dispatch({ type: GET_AUTOPAYMENT_INFO }),
    getMessages: () => dispatch({ type: GET_MESSAGES }),
    dispatch,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Payments)
