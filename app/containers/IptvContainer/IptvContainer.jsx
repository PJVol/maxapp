import React from 'react'
import { Text, View, Image } from 'react-native'
import { withNavigation } from 'react-navigation'
import PropTypes from 'prop-types'
import { iptv } from '../../assets'
import { strings } from '../../utils'
import { Routes } from '../../config'
import { ServiceContainer } from './../ServiceContainer'
import styles from './styles'

class IptvContainer extends React.Component {
  static defaultProps = {
    iptv: null,
  }
  static propTypes = {
    iptv: PropTypes.array,
    navigation: PropTypes.object,
  }

  _getFullSubscription = item => {
    let plan = item.plan.name.trim()
    item.extra.forEach(element => {
      plan = plan + ', ' + element.name.trim()
    })
    return plan
  }

  _renderContentComponent = item => {
    return (
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.comment != '' ? item.comment.trim() : item.device.trim()}</Text>
        <Text style={styles.itemText}>{strings('SUBSCRIPTION') + ': ' + this._getFullSubscription(item)}</Text>
      </View>
    )
  }

  _renderTitleComponent = () => {
    return (
      <View style={styles.header}>
        <Image source={iptv} width={50} height={50} style={styles.headerIcon} />
        <Text style={styles.headerTitle}>{strings('TV_TITLE')}</Text>
      </View>
    )
  }

  _handleItemPress = item => {
    requestAnimationFrame(async () => {
      this.props.navigation.navigate(Routes.IptvInfo, { iptv: item })
    })
  }

  render() {
    return (
      <ServiceContainer
        noItemText={strings('NO_IPTV')}
        onPress={this._handleItemPress}
        services={this.props.iptv}
        contentComponent={this._renderContentComponent}
        titleComponent={this._renderTitleComponent()}
      />
    )
  }
}

export default withNavigation(IptvContainer)
