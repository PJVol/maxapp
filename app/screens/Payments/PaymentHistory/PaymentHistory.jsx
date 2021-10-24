import React from "react";
import {
  Dimensions,
  Text,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  TouchableOpacity,
  BackHandler
} from "react-native";
import { connect } from "react-redux";
import Picker from "react-native-picker";
import { FlatList } from "react-navigation";
import FontAwesome5Pro from "react-native-vector-icons/FontAwesome5Pro";
import PropTypes from "prop-types";
import {
  strings,
  formatDate,
  formatMonth,
  isInArray,
  logInfo
} from "../../../utils";
import { HistoryContainer } from "../../../containers";
import { Fonts } from "../../../config";
import styles from "./styles";
import { GET_MESSAGES } from "../../../store/messages/actions";

class PaymentHistory extends React.Component {
  _didFocusSubscription;
  _willBlurSubscription;

  static navigationOptions = () => ({ gesturesEnabled: false });

  state = {
    dates: [],
    years: [],
    pageIndex: 0,
    pickerShown: false
  };

  static propTypes = {
    navigation: PropTypes.object,
    signDate: PropTypes.string,
    getMessages: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.viewabilityConfig = {
      viewAreaCoveragePercentThreshold: 50,
      minimumViewTime: 0
    };

    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      () => {
        BackHandler.addEventListener(
          "hardwareBackPress",
          this.onBackButtonPressAndroid
        );
      }
    );
  }

  componentDidMount() {
    logInfo(this.constructor.name + " did mount");
    this.props.getMessages();

    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      () => {
        Picker.hide();
        this.setState({ pickerShown: false });
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.onBackButtonPressAndroid
        );
      }
    );
  }

  componentWillUnmount() {
    logInfo(this.constructor.name + " will unmount");

    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  onBackButtonPressAndroid = () => {
    if (this.state.pickerShown) {
      Picker.hide();
      this.setState({ pickerShown: false });
    } else {
      this.props.navigation.goBack();
    }
    return true;
  };

  componentWillMount() {
    this._generateDates();
  }

  _generateDates = async () => {
    let years = [];
    let dates = [];

    var date = new Date(this.props.signDate);
    var end = new Date();

    while (
      (date.getMonth() <= end.getMonth() &&
        date.getFullYear() == end.getFullYear()) ||
      date.getFullYear() < end.getFullYear()
    ) {
      dates.unshift(new Date(date));
      if (!isInArray(date.getFullYear(), years)) {
        years.push(date.getFullYear());
      }
      date.setMonth(date.getMonth() + 1);
    }
    await this.setState({ dates, years });
  };

  _renderPage = ({ item, index }) => {
    return (
      <HistoryContainer
        date={item}
        index={index}
        currentIndex={this.state.pageIndex}
      />
    );
  };

  _showPicker = () => {
    requestAnimationFrame(() => {
      Picker.init({
        pickerData: [
          Array.apply(null, { length: 12 })
            .map(Number.call, Number)
            .map(element => {
              return formatMonth(element);
            }),
          this.state.years
        ],
        selectedValue: [
          formatMonth(this.state.dates[this.state.pageIndex].getMonth()),
          this.state.dates[this.state.pageIndex].getFullYear()
        ],
        pickerConfirmBtnText: strings("PICKER_SELECT"),
        pickerCancelBtnText: strings("PICKER_CANCEL"),
        pickerTitleText: strings("PICKER_DATE_TITLE"),
        pickerFontSize: Fonts.BIG,
        onPickerConfirm: (data, index) => {
          let month = index[0];
          let year = data[1];

          if (
            month > this.state.dates[0].getMonth() &&
            year === this.state.dates[0].getFullYear()
          ) {
            month = this.state.dates[0].getMonth();
          }
          if (
            month < this.state.dates[this.state.dates.length - 1].getMonth() &&
            year === this.state.dates[this.state.dates.length - 1].getFullYear()
          ) {
            month = this.state.dates[this.state.dates.length - 1].getMonth();
          }

          let pageIndex =
            (this.state.dates[0].getFullYear() - year) * 12 +
            this.state.dates[0].getMonth() -
            month;

          this._scroll._listRef._scrollRef.scrollTo({
            x: pageIndex * Dimensions.get("window").width,
            animated: false
          });
          this.setState({ pickerShown: false });
        },
        onPickerCancel: () => {
          this.setState({ pickerShown: false });
        },
        onPickerSelect: (data, index) => {
          let month = index[0];
          let year = parseInt(data[1]);

          if (
            month > this.state.dates[0].getMonth() &&
            year === this.state.dates[0].getFullYear()
          ) {
            Picker.select([
              formatMonth(this.state.dates[0].getMonth()),
              this.state.dates[0].getFullYear()
            ]);
            data = [
              formatMonth(this.state.dates[0].getMonth()),
              this.state.dates[0].getFullYear()
            ];
            return;
          }

          if (
            month < this.state.dates[this.state.dates.length - 1].getMonth() &&
            year === this.state.dates[this.state.dates.length - 1].getFullYear()
          ) {
            Picker.select([
              formatMonth(
                this.state.dates[this.state.dates.length - 1].getMonth()
              ),
              this.state.dates[this.state.dates.length - 1].getFullYear()
            ]);
            data = [
              formatMonth(
                this.state.dates[this.state.dates.length - 1].getMonth()
              ),
              this.state.dates[this.state.dates.length - 1].getFullYear()
            ];
            return;
          }
        }
      });
      Picker.show();
      this.setState({ pickerShown: true });
    });
  };

  onViewableItemsChanged = info => {
    const { changed } = info;
    this.setState({ pageIndex: changed[0].index });
  };

  _renderModal = () => {
    if (this.state.pickerShown) {
      return <View style={styles.modal} />;
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback
        disabled={!this.state.pickerShown}
        onPress={() => {
          Picker.hide();
          this.setState({ pickerShown: false });
        }}
      >
        <View style={styles.background}>
          <Text style={styles.title}>{strings("PAYMENT_HISTORY")}</Text>
          <StatusBar
            translucent={true}
            backgroundColor={"transparent"}
            barStyle="dark-content"
          />

          <View style={styles.topBar}>
            <TouchableOpacity
              disabled={this.state.pageIndex === this.state.dates.length - 1}
              onPress={() => {
                this._scroll._listRef._scrollRef.scrollTo({
                  x:
                    (this.state.pageIndex + 1) * Dimensions.get("window").width,
                  animated: true
                });
              }}
            >
              <FontAwesome5Pro
                name="chevron-left"
                color="#8AABB6"
                style={
                  this.state.pageIndex === this.state.dates.length - 1
                    ? styles.arrowHide
                    : styles.arrowShow
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateButton}
              onPress={this._showPicker}
            >
              <Text style={styles.dateLabel}>
                <Text style={styles.date}>
                  {formatDate(this.state.dates[this.state.pageIndex])}
                </Text>
                {"  "}
                <FontAwesome5Pro
                  style={styles.calendarIcon}
                  name="calendar"
                  color="#8AABB6"
                />
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={!this.state.pageIndex}
              onPress={() => {
                this._scroll._listRef._scrollRef.scrollTo({
                  x:
                    (this.state.pageIndex - 1) * Dimensions.get("window").width,
                  animated: true
                });
              }}
            >
              <FontAwesome5Pro
                name="chevron-right"
                color="#8AABB6"
                style={
                  !this.state.pageIndex ? styles.arrowHide : styles.arrowShow
                }
              />
            </TouchableOpacity>
          </View>

          <FlatList
            viewabilityConfig={this.viewabilityConfig}
            onViewableItemsChanged={this.onViewableItemsChanged}
            style={styles.page}
            ref={ref => (this._scroll = ref)}
            showsHorizontalScrollIndicator={false}
            snapToInterval={Dimensions.get("window").width}
            keyExtractor={(item, index) => index.toString()}
            windowSize={3}
            decelerationRate="fast"
            horizontal={true}
            bounces={false}
            inverted={true}
            initialNumToRender={1}
            maxToRenderPerBatch={1}
            onEndReachedThreshold={0.5}
            data={this.state.dates}
            renderItem={this._renderPage}
          />
          {this._renderModal()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => ({ signDate: state.info.signed });
const mapDispatchToProps = dispatch => {
  return {
    getMessages: () => dispatch({ type: GET_MESSAGES }),
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentHistory);
