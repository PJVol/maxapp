import React from "react";
import {
  View,
  Text,
  Platform,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableNativeFeedback
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Collapsible from "react-native-collapsible";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import FontAwesome5Pro from "react-native-vector-icons/FontAwesome5Pro";
import { constants } from "../../utils";
import { Colors } from "../../config";
import styles from "./styles";

class ServiceContainer extends React.Component {
  _willBlurSubscription;

  static defaultProps = {
    services: null
  };
  static propTypes = {
    services: PropTypes.array,
    navigation: PropTypes.object,
    contentComponent: PropTypes.func,
    onPress: PropTypes.func,
    noItemText: PropTypes.string,
    titleComponent: PropTypes.node
  };

  state = {
    collapse:
      this.props.services && this.props.services.length > 5 ? true : false
  };

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      () =>
        this.setState({
          collapse:
            this.props.services && this.props.services.length > 5 ? true : false
        })
    );
  }

  componentWillUnmount() {
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  componentDidUpdate(prevProps) {
    if (
      (this.props.services &&
        prevProps.services &&
        this.props.services.length != prevProps.services.length) ||
      (this.props.services && !prevProps.services)
    ) {
      this.setState({
        collapse:
          this.props.services && this.props.services.length > 5 ? true : false
      });
    } else if (!this.props.services && this.state.collapse) {
      this.setState({ collapse: false });
    }
  }

  _renderContent = item => {
    return (
      <View style={styles.item}>
        {this.props.contentComponent(item)}
        <FontAwesome5Pro
          style={styles.arrow}
          name="chevron-right"
          color="#8AABB6"
        />
      </View>
    );
  };

  _renderItem = ({ item }) => {
    if (
      Platform.OS === "android" &&
      Platform.Version >= constants.ANDROID_VERSION_LOLLIPOP
    ) {
      return (
        <TouchableNativeFeedback
          onPress={() => this.props.onPress(item)}
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
          onPress={() => this.props.onPress(item)}
        >
          {this._renderContent(item)}
        </TouchableHighlight>
      );
    }
  };

  _renderSeparator = () => {
    return <View style={styles.horizontal_ruler} />;
  };

  _renderEmptyComponent = () => {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyText}>{this.props.noItemText}</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.contentBlock}>
        <TouchableWithoutFeedback
          disabled={!(this.props.services && this.props.services.length > 5)}
          onPress={() => {
            if (this.state.collapse) {
              this.setState({ collapse: false });
            } else {
              this.setState({
                collapse:
                  this.props.services && this.props.services.length > 5
                    ? true
                    : false
              });
            }
          }}
        >
          <View style={styles.header}>
            {this.props.titleComponent}
            <FontAwesome5Pro
              style={
                this.props.services && this.props.services.length > 5
                  ? this.state.collapse
                    ? styles.collapseIconDown
                    : styles.collapseIconUp
                  : styles.collapseIconHide
              }
              name="chevron-down"
              color="#8AABB6"
            />
          </View>
        </TouchableWithoutFeedback>

        <Collapsible collapsed={this.state.collapse}>
          <View style={styles.horizontal_ruler} />
          <FlatList
            scrollEnabled={false}
            ListEmptyComponent={this._renderEmptyComponent}
            ItemSeparatorComponent={this._renderSeparator}
            overScrollMode="never"
            bounces={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            data={this.props.services}
            renderItem={this._renderItem}
            initialNumToRender={50}
            maxToRenderPerBatch={50}
            onEndReachedThreshold={0.5}
            windowSize={3}
          />
        </Collapsible>
      </View>
    );
  }
}

export default withNavigation(ServiceContainer);
