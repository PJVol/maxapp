import React from 'react'
import { Text, View, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { strings, formatCurrencyText, logInfo } from '../../utils'
import { Button, Page, ContactSupport } from '../../components'
import { GET_BALANCE, LOGOUT, GET_SERVICES } from '../../store'
import { DirectContainer, VoipContainer, IptvContainer } from '../../containers'
import { Routes, Colors } from '../../config'
import styles from './styles'
import { GET_MESSAGES } from '../../store/messages/actions'

class Home extends React.Component {
  _didFocusSubscription
  _willBlurSubscription

  static propTypes = {
    navigation: PropTypes.object,
    balance: PropTypes.number,
    direct: PropTypes.array,
    iptv: PropTypes.array,
    voip: PropTypes.array,
    logout: PropTypes.func,
    getBalance: PropTypes.func,
    getAllServices: PropTypes.func,
    getMessages: PropTypes.func,
  }

  state = {
    refreshing: false,
  }

  constructor(props) {
    super(props)
    this._didFocusSubscription = props.navigation.addListener('didFocus', () => {
      this.getAccountInfo()
      this.props.getMessages()

      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    })
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
    BackHandler.exitApp()
    return true
  }

  getAccountInfo = () => {
    this.props.getBalance()
    this.props.getAllServices()
  }

  //WARNING: adjustsFontSizeToFit works only for iOS
  //TODO: Find crossplatform solution for font size adjustment
  render() {
    return (
      <Page
        title={strings('TITLE_MAIN')}
        refreshEnabled={true}
        refreshing={this.state.refreshing}
        onRefresh={() => {
          this.setState({ refreshing: true })
          this.getAccountInfo()
          this.props.getMessages()
          this.setState({ refreshing: false })
        }}
      >
        <View style={styles.contentBlock}>
          <Text style={styles.block_title}>{strings('AMOUNT_BLOCK_TITLE')}</Text>
          <View style={styles.separator} />

          <Text numberOfLines={1} style={styles.balanceWrapper}>
            <Text
              style={[
                {
                  color: this.props.balance >= 0 ? Colors.PRIMARY : Colors.RED_TEXT,
                },
                styles.amount,
              ]}
            >
              {this.props.balance ? formatCurrencyText(this.props.balance) : ''}
            </Text>
            <Text style={styles.currency}>{this.props.balance ? `\u200A\u200A\u20BD` : ''}</Text>
          </Text>
          <Button
            style={styles.button}
            onPress={() => this.props.navigation.navigate(Routes.Payments)}
            pressColor={Colors.BUTTON_PRESSED}
            backgroundColor={Colors.BUTTON_BACKGROUND}
            text={strings('TO_PAYMENTS')}
            textStyle={styles.buttonText}
          />
        </View>

        <DirectContainer direct={this.props.direct} />
        <IptvContainer iptv={this.props.iptv} />
        <VoipContainer voip={this.props.voip} />

        <ContactSupport style={styles.contactSupport} />
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  balance: state.info.balance,
  direct: state.services.direct,
  voip: state.services.voip,
  iptv: state.services.iptv,
})
const mapDispatchToProps = dispatch => {
  return {
    logout: callback => dispatch({ type: LOGOUT, payload: { callback } }),
    getBalance: () => dispatch({ type: GET_BALANCE }),
    getAllServices: () => dispatch({ type: GET_SERVICES }),
    getMessages: () => dispatch({ type: GET_MESSAGES }),
    dispatch,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
