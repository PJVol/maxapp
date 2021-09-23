import React from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import PropTypes from "prop-types";
import { strings } from "../../utils";
import styles from "./styles";
import CardComponent from "./SwipeableComponent";

export class CardsContainer extends React.Component {
  static defaultProps = {
    cards: null,
    currentCardId: null
  };
  static propTypes = {
    currentCardId: PropTypes.number,
    cards: PropTypes.array
  };

  _renderItem = ({ item }) => {
    return <CardComponent curentCard={this.props.currentCardId} card={item} />;
  };

  _renderSeparator = () => {
    return <View style={styles.horizontal_ruler} />;
  };

  _renderEmptyComponent = () => {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyText}>{strings("NO_CARDS")}</Text>
      </View>
    );
  };

  render() {
    return (
      <FlatList
        ListEmptyComponent={this._renderEmptyComponent}
        ItemSeparatorComponent={this._renderSeparator}
        overScrollMode="never"
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={this.props.cards}
        renderItem={this._renderItem}
      />
    );
  }
}
