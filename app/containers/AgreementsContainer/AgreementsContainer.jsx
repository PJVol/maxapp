import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import { SET_AGREEMENT, GET_INFO } from "../../store";
import { Routes } from "../../config";
import styles from "./styles";

class AgreementsContainer extends React.Component {
  static propTypes = {
    agreementList: PropTypes.array,
    saveCurrentAgreement: PropTypes.func,
    navigation: PropTypes.object,
    getInfo: PropTypes.func
  };

  _handleItemPress = item => {
    this.props.saveCurrentAgreement(item.agreement);
    this.props.getInfo();
    this.props.navigation.navigate(Routes.MainNavigator);
  };

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => this._handleItemPress(item)}
        style={styles.item}
      >
        <Text style={styles.agreement}>{item.agreement}</Text>
        <Text style={styles.name}>
          {item.org_name === "" ? item.person : item.org_name}
        </Text>
      </TouchableOpacity>
    );
  };

  _renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  render() {
    return (
      <FlatList
        ItemSeparatorComponent={this._renderSeparator}
        overScrollMode="never"
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={this.props.agreementList}
        renderItem={this._renderItem}
      />
    );
  }
}

const mapStateToProps = state => ({ agreementList: state.info.agreements });
const mapDispatchToProps = dispatch => {
  return {
    saveCurrentAgreement: agreement =>
      dispatch({ type: SET_AGREEMENT, payload: { agreement } }),
    getInfo: () => dispatch({ type: GET_INFO }),
    dispatch
  };
};

export default withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AgreementsContainer)
);
