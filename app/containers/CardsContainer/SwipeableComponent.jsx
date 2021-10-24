import React from 'react'
import { Animated, View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { RectButton } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import { visa, masterCard, mir } from '../../assets'
import { Colors } from '../../config'
import ActionSheet from 'react-native-action-sheet'
import styles from './styles'
import { SET_AUTOPAYMENT_SETTINGS, REMOVE_CARD } from '../../store'
import { strings } from '../../utils'

class SwipeableComponent extends React.Component {
  static defaultProps = {
    card: null,
  }
  static propTypes = {
    card: PropTypes.object,
    autopaymentLimit: PropTypes.number,
    autopaymentEnabled: PropTypes.bool,
    curentCard: PropTypes.number,
    saveAutopaymentSettings: PropTypes.func,
    removeCreditCard: PropTypes.func,
  }

  state = {
    swipeableOpened: false,
  }

  _renderRightAction = (icon, callback, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    })

    return (
      <Animated.View
        style={[
          {
            transform: [
              {
                translateX: trans,
              },
            ],
          },
          styles.swipeableAction,
        ]}
      >
        <RectButton
          onPress={callback}
          style={[
            {
              backgroundColor: color,
            },
            styles.swipeableActionButton,
          ]}
        >
          {icon}
        </RectButton>
      </Animated.View>
    )
  }

  _renderRightActions = progress => (
    <View style={styles.swipeableActionWrapper}>
      {this._renderRightAction(
        <FontAwesome5Pro style={styles.starIcon} solid={true} name="star" color="#FFFFFF" />,
        () => {
          ActionSheet.showActionSheetWithOptions(
            {
              options: [strings('YES'), strings('CANCEL')],
              cancelButtonIndex: 1,
              tintColor: Colors.PRIMARY,
              title: strings('MAKE_PRIMARY'),
            },
            index => {
              if (index === 0) {
                this.props.saveAutopaymentSettings(
                  this.props.autopaymentLimit,
                  this.props.card.card_id,
                  this.props.autopaymentEnabled,
                )
              }
            },
          )
          this._swipeableRef.close()
        },
        Colors.PRIMARY,
        128,
        progress,
      )}
      {this._renderRightAction(
        <FontAwesome5Pro style={styles.deleteIcon} name="trash" color="#FFFFFF" />,
        () => {
          ActionSheet.showActionSheetWithOptions(
            {
              options: [strings('DELETE'), strings('CANCEL')],
              cancelButtonIndex: 1,
              destructiveButtonIndex: 0,
              tintColor: Colors.PRIMARY,
              title: strings('DELETE_CARD'),
            },
            index => {
              if (index === 0) {
                this.props.removeCreditCard(this.props.card.card_id)
              }
            },
          )
          this._swipeableRef.close()
        },
        Colors.RED_BACKGROUND,
        64,
        progress,
      )}
    </View>
  )

  _renderCardTypeIcon = pan => {
    const icon = pan.indexOf('2') == 0 ? mir : pan.indexOf('4') == 0 ? visa : pan.indexOf('5') == 0 ? masterCard : null
    return <Image source={icon} style={styles.icon} />
  }

  _renderIsPrimary = card_id => {
    if (card_id === this.props.curentCard && !this.state.swipeableOpened) {
      return <FontAwesome5Pro style={styles.primaryIcon} name="star" solid={true} color={Colors.PRIMARY} />
    }
  }

  render() {
    return (
      <Swipeable
        onSwipeableWillOpen={() => this.setState({ swipeableOpened: true })}
        onSwipeableWillClose={() => this.setState({ swipeableOpened: false })}
        overshootRight={false}
        ref={ref => (this._swipeableRef = ref)}
        renderRightActions={this._renderRightActions}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this._swipeableRef.openRight()
          }}
        >
          <View style={styles.item}>
            {this._renderCardTypeIcon(this.props.card.pan)}
            <Text style={styles.itemText}>{this.props.card.pan}</Text>
            {this._renderIsPrimary(this.props.card.card_id)}
          </View>
        </TouchableWithoutFeedback>
      </Swipeable>
    )
  }
}

const mapStateToProps = state => ({
  autopaymentEnabled: state.payment.autopaymentEnabled,
  autopaymentLimit: state.payment.autopaymentLimit,
})
const mapDispatchToProps = dispatch => {
  return {
    saveAutopaymentSettings: (limit, card, enabled) =>
      dispatch({
        type: SET_AUTOPAYMENT_SETTINGS,
        payload: { limit, card, enabled },
      }),
    removeCreditCard: card => dispatch({ type: REMOVE_CARD, payload: { card } }),
    dispatch,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SwipeableComponent)
