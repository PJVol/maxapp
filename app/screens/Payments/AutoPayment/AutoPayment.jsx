import React from 'react'
import { View, Text, Switch } from 'react-native'
import { connect } from 'react-redux'
import StyledText from 'react-native-styled-text'
import { PreviousNextView } from 'react-native-keyboard-manager'
import PropTypes from 'prop-types'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import { strings, logInfo } from '../../../utils'
import { Page, ContactSupport, TextInput, RoundButton } from '../../../components'
import { CardsContainer } from '../../../containers'
import { Routes, Colors } from '../../../config'
import numeral from 'numeral'
import styles from './styles'
import { GET_AUTOPAYMENT_INFO, SET_AUTOPAYMENT_SETTINGS } from '../../../store'
import { GET_MESSAGES } from '../../../store/messages/actions'

class AutoPayment extends React.Component {
  static navigationOptions = () => ({ gesturesEnabled: false })

  state = {
    amount: numeral(this.props.autopaymentLimit),
    enabled: this.props.autopaymentEnabled,
    refreshing: false,
  }

  static propTypes = {
    autopaymentLimit: PropTypes.number,
    autopaymentEnabled: PropTypes.bool,
    cards: PropTypes.array,
    card_id: PropTypes.number,
    navigation: PropTypes.object,
    getAutopaymentInfo: PropTypes.func,
    saveAutopaymentSettings: PropTypes.func,
    getMessages: PropTypes.func,
  }

  componentWillMount() {
    this._updateInfo()
    this.props.getMessages()
  }

  componentDidMount() {
    logInfo(this.constructor.name + ' did mount')
  }

  componentWillUnmount() {
    logInfo(this.constructor.name + ' will unmount')
  }

  _updateInfo = () => {
    this.props.getAutopaymentInfo()
    this.setState({
      amount: numeral(this.props.autopaymentLimit),
      enabled: this.props.autopaymentEnabled,
    })
  }

  componentDidUpdate(prevProps) {
    if (this._input && prevProps.autopaymentLimit != this.state.amount.value() && !this._input.isFocused()) {
      this.setState({ amount: numeral(this.props.autopaymentLimit) })
    }
    if (prevProps.autopaymentEnabled != this.props.autopaymentEnabled) {
      this.setState({ enabled: this.props.autopaymentEnabled })
    }
  }

  _renderFooter = () => {
    if (this.props.cards && this.props.cards.length > 0 && this.props.autopaymentEnabled) {
      return (
        <View>
          <View style={styles.horizontal_ruler} />
          <PreviousNextView style={styles.cardsFooter}>
            <Text style={styles.amount}>{strings('MAX_AMOUNT')}</Text>

            <TextInput
              onEndEditing={() => {
                logInfo('EndEditing')
                if (this.state.amount.value() < 1) {
                  this._input.showError()
                  return
                }
                if (this.state.amount.value() === this.props.autopaymentLimit) {
                  return
                }
                this.props.saveAutopaymentSettings(
                  this.state.amount.value(),
                  this.props.card_id,
                  this.props.autopaymentEnabled,
                )
              }}
              ref={ref => (this._input = ref)}
              placeholder={strings('LIMIT_INPUT')}
              normalBorder={Colors.INPUT_BORDER}
              focusedBorder={Colors.INPUT_FOCUS}
              style={styles.limitInput}
              keyboardType="number-pad"
              maxLength={9}
              onChangeText={amount => this.setState({ amount: numeral(amount) })}
              value={this.state.amount.format()}
            />

            <StyledText style={styles.footer_text}>
              {'<b>' + strings('ATTENTION') + '</b> ' + strings('AUTO_REMINDER')}
            </StyledText>
          </PreviousNextView>
        </View>
      )
    }
  }

  render() {
    return (
      <Page
        title={strings('AUTO')}
        refreshEnabled={true}
        refreshing={this.state.refreshing}
        onRefresh={() => {
          this.setState({ refreshing: true })
          this._updateInfo()
          this.props.getMessages()
          this._page.setState({ refreshing: false })
        }}
      >
        <View style={styles.statusBlock}>
          <Text style={styles.status}>{strings('AUTO_STATUS')}</Text>
          <Switch
            disabled={!(this.props.cards && this.props.cards.length > 0)}
            onValueChange={value => {
              this.setState({ enabled: value })

              this.props.saveAutopaymentSettings(this.props.autopaymentLimit, this.props.card_id, value)
            }}
            value={this.state.enabled}
          />
        </View>

        <View style={styles.cardsBlock}>
          <View style={styles.cardsHeader}>
            <Text style={styles.block_headlines}>{strings('CARDS')}</Text>
            <RoundButton
              onPress={() => {
                this.props.navigation.navigate(Routes.PaymentService, {
                  serviceName: 'PLASTICCARD',
                  auto: true,
                })
              }}
              icon={<FontAwesome5Pro style={styles.plusIcon} name="plus" color="#8AABB6" />}
            />
          </View>

          <View style={styles.horizontal_ruler} />
          <CardsContainer cards={this.props.cards} currentCardId={this.props.card_id} />

          {this._renderFooter()}
        </View>

        <ContactSupport style={styles.contactSupport} />
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  autopaymentEnabled: state.payment.autopaymentEnabled,
  autopaymentLimit: state.payment.autopaymentLimit,
  cards: state.payment.cards,
  card_id: state.payment.card_id,
})
const mapDispatchToProps = dispatch => {
  return {
    getAutopaymentInfo: () => dispatch({ type: GET_AUTOPAYMENT_INFO }),
    saveAutopaymentSettings: (limit, card, enabled) =>
      dispatch({
        type: SET_AUTOPAYMENT_SETTINGS,
        payload: { limit, card, enabled },
      }),
    getMessages: () => dispatch({ type: GET_MESSAGES }),
    dispatch,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AutoPayment)
