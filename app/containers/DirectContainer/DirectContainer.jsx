import React from 'react'
import { Text, View, Image } from 'react-native'
import { withNavigation } from 'react-navigation'
import PropTypes from 'prop-types'
import { direct } from '../../assets'
import { strings } from '../../utils'
import { ServiceContainer } from './../ServiceContainer'
import { Routes } from '../../config'
import styles from './styles'

class DirectContainer extends React.Component {
  static defaultProps = {
    direct: null,
  }
  static propTypes = {
    navigation: PropTypes.object,
    direct: PropTypes.array,
  }

  _renderContentComponent = item => {
    return (
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.subnet.trim()}</Text>
        <Text style={styles.itemText}>{strings('PLAN') + ': ' + item.plan.name.trim()}</Text>
      </View>
    )
  }

  _renderTitleComponent = () => {
    return (
      <View style={styles.header}>
        <Image width={50} height={50} style={styles.headerIcon} source={direct} />
        <Text style={styles.headerTitle}>{strings('INTERNET_TITLE')}</Text>
      </View>
    )
  }

  _handleItemPress = item => {
    requestAnimationFrame(async () => {
      this.props.navigation.navigate(Routes.DirectInfo, { direct: item })
    })
  }

  render() {
    return (
      <ServiceContainer
        noItemText={strings('NO_DIRECT')}
        onPress={this._handleItemPress}
        services={this.props.direct}
        contentComponent={this._renderContentComponent}
        titleComponent={this._renderTitleComponent()}
      />
    )
  }
}

export default withNavigation(DirectContainer)
