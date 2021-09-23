import React from "react";
import { View, BackHandler } from "react-native";
import PropTypes from "prop-types";
import { AuthPage } from "../../../components";
import { strings, logInfo } from "../../../utils";
import styles from "./styles";
import { AgreementsContainer } from "../../../containers";

export class AgreementSelect extends React.Component {
  _didFocusSubscription;
  _willBlurSubscription;

  static propTypes = {
    navigation: PropTypes.object,
    logout: PropTypes.func
  };

  constructor(props) {
    super(props);
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

    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      () =>
        BackHandler.removeEventListener(
          "hardwareBackPress",
          this.onBackButtonPressAndroid
        )
    );
  }

  componentWillUnmount() {
    logInfo(this.constructor.name + " wiil unmount");

    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  onBackButtonPressAndroid = () => {
    BackHandler.exitApp();
    return true;
  };

  render() {
    return (
      <AuthPage title={strings("SELECT_AGREEMENTS_TITLE")}>
        <View style={styles.wrapper}>
          <AgreementsContainer />
        </View>
      </AuthPage>
    );
  }
}
