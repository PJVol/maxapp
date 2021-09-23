import React from "react";
import {
  View,
  Text,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FontAwesome5Pro from "react-native-vector-icons/FontAwesome5Pro";
import { strings, constants } from "../../utils";
import { Routes, Colors } from "../../config";
import styles from "./styles";

class PaymentMethodsContainer extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    autopaymentEnabled: PropTypes.bool,
    paymentMethods: PropTypes.array
  };

  _onPress = item => {
    if (item === "auto") {
      this.props.navigation.navigate(Routes.AutoPayment);
    } else {
      this.props.navigation.navigate(Routes.PaymentService, {
        serviceName: item.toUpperCase()
      });
    }
  };

  _renderContentComponent = item => {
    return <Text style={styles.block_text}>{strings(item.toUpperCase())}</Text>;
  };

  _renderAutoComponent = () => {
    return (
      <View style={styles.itemContent}>
        {this._renderContentComponent("auto")}
        <Text
          style={[
            {
              color: this.props.autopaymentEnabled
                ? Colors.BLUE_TEXT
                : Colors.RED_TEXT
            },
            styles.auto_status
          ]}
        >
          {this.props.autopaymentEnabled
            ? strings("AUTO_ON")
            : strings("AUTO_OFF")}
        </Text>
      </View>
    );
  };

  _renderContent = item => {
    if (item === "plasticcard") {
      if (
        Platform.OS === "android" &&
        Platform.Version >= constants.ANDROID_VERSION_LOLLIPOP
      ) {
        return (
          <View>
            <TouchableNativeFeedback
              onPress={() => this._onPress("auto")}
              delayPressIn={0}
              background={TouchableNativeFeedback.Ripple(
                Colors.DARK_PRESSED,
                false
              )}
            >
              <View style={styles.item}>
                {this._renderAutoComponent(item)}
                <FontAwesome5Pro
                  style={styles.arrow}
                  name="chevron-right"
                  color="#8AABB6"
                />
              </View>
            </TouchableNativeFeedback>
            {this._renderSeparator()}
            {this._renderItem({ item: item.toUpperCase() })}
          </View>
        );
      } else {
        return (
          <View>
            <TouchableHighlight
              underlayColor={Colors.DARK_PRESSED}
              onPress={() => this._onPress("auto")}
            >
              <View style={styles.item}>
                {this._renderAutoComponent("auto")}
                <FontAwesome5Pro
                  style={styles.arrow}
                  name="chevron-right"
                  color="#8AABB6"
                />
              </View>
            </TouchableHighlight>
            {this._renderSeparator()}
            {this._renderItem({ item: item.toUpperCase() })}
          </View>
        );
      }
    } else {
      return (
        <View style={styles.item}>
          {this._renderContentComponent(item)}
          <FontAwesome5Pro
            style={styles.arrow}
            name="chevron-right"
            color="#8AABB6"
          />
        </View>
      );
    }
  };

  _renderItem = ({ item }) => {
    if (item != "plasticcard") {
      if (
        Platform.OS === "android" &&
        Platform.Version >= constants.ANDROID_VERSION_LOLLIPOP
      ) {
        return (
          <TouchableNativeFeedback
            onPress={() => this._onPress(item)}
            delayPressIn={0}
            background={TouchableNativeFeedback.Ripple(
              Colors.DARK_PRESSED,
              false
            )}
          >
            {this._renderContent(item)}
          </TouchableNativeFeedback>
        );
      } else {
        return (
          <TouchableHighlight
            underlayColor={Colors.DARK_PRESSED}
            onPress={() => this._onPress(item)}
          >
            {this._renderContent(item)}
          </TouchableHighlight>
        );
      }
    } else {
      return this._renderContent(item);
    }
  };

  _renderSeparator = () => {
    return <View style={styles.horizontal_ruler} />;
  };

  _renderEmptyComponent = () => {
    return (
      <View style={styles.item}>
        <Text style={styles.block_text}>{strings("NO_PAYMENT_TYPES")}</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.contentBlock}>
        <FlatList
          ListEmptyComponent={this._renderEmptyComponent}
          ItemSeparatorComponent={this._renderSeparator}
          overScrollMode="never"
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={this.props.paymentMethods}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  paymentMethods: state.payment.paymentTypes,
  autopaymentEnabled: state.payment.autopaymentEnabled
});

export default withNavigation(
  connect(mapStateToProps)(PaymentMethodsContainer)
);
