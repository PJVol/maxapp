import React, { PureComponent } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FontAwesome5Pro from "react-native-vector-icons/FontAwesome5Pro";
import { strings, formatCurrencyText, formatDate } from "../../utils";
import styles from "./styles";
import { GET_PAYMENT_HISTORY } from "../../store";

class HistoryContainer extends PureComponent {
  static defaultProps = {
    date: null,
    index: null,
    currentIndex: null
  };
  static propTypes = {
    index: PropTypes.number,
    currentIndex: PropTypes.number,
    history: PropTypes.array,
    internetAvailable: PropTypes.bool,
    date: PropTypes.object,
    locale: PropTypes.string,
    getPaymentHistory: PropTypes.func
  };

  componentWillMount() {
    this.props.getPaymentHistory(this.props.date);
  }

  _renderMiddleBar = amount => {
    return (
      <Text
        style={
          amount < 0 ? styles.separataorNegative : styles.separatorPositive
        }
      >
        {"\u007C"}
      </Text>
    );
  };

  _renderLeftIcon = amount => {
    if (amount < 0) {
      return (
        <FontAwesome5Pro
          style={styles.icon}
          name="chevron-left"
          color="#EF6D76"
        />
      );
    } else {
      return (
        <FontAwesome5Pro
          style={styles.icon}
          name="chevron-right"
          color="#72B128"
        />
      );
    }
  };

  _renderItem = ({ item }) => {
    const { paydate, amount, comment } = item;
    return (
      <View style={styles.item}>
        <View style={styles.paymentInfoWrapper}>
          <View style={styles.amountWrapper}>
            {this._renderLeftIcon(amount)}
            <Text style={styles.amount}>
              {formatCurrencyText(Math.abs(amount))}
              {`\u200A\u200A\u20BD`}
            </Text>
          </View>

          <View style={styles.verticalSpacer}>
            {this._renderMiddleBar(amount)}
          </View>

          <View style={styles.dateWrapper}>
            <Text style={styles.date}>
              {new Date(paydate * 1000).toLocaleDateString(this.props.locale, {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric"
              })}
              {`\n`}
              {new Date(paydate * 1000).toLocaleTimeString(this.props.locale, {
                hour: "numeric",
                minute: "numeric"
              })}
            </Text>
          </View>
        </View>

        {this._renderComment(comment)}
      </View>
    );
  };

  _renderComment = comment => {
    if (comment && comment != "") {
      return (
        <View style={styles.commentWrapper}>
          <Text style={styles.comment}>{comment}</Text>
        </View>
      );
    }
  };

  _renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  _renderEmptyComponent = () => {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyText}>
          {strings("NO_PAYMENT_HISTORY") + " " + formatDate(this.props.date)}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.wrapper}>
          <FlatList
            ListEmptyComponent={this._renderEmptyComponent}
            ItemSeparatorComponent={this._renderSeparator}
            overScrollMode="never"
            bounces={false}
            keyExtractor={(item, index) => index.toString()}
            data={this.props.history}
            renderItem={this._renderItem}
            initialNumToRender={20}
            maxToRenderPerBatch={10}
            onEndReachedThreshold={0.7}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state, props) => ({
  history: state.payment.paymentHistory[props.date],
  locale: state.status.locale,
  internetAvailable: state.status.isConnected
});
const mapDispatchToProps = dispatch => {
  return {
    getPaymentHistory: date =>
      dispatch({ type: GET_PAYMENT_HISTORY, payload: { date } }),
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryContainer);
