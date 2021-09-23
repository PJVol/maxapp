import React from 'react'
import { Text, View, Image } from 'react-native'
import { withNavigation } from 'react-navigation'
import PropTypes from 'prop-types'
import { voip } from '../../assets'
import { strings } from '../../utils'
import { Routes } from '../../config'
import { ServiceContainer } from './../ServiceContainer'
import styles from './styles'

class VoipContainer extends React.Component {
  static defaultProps = {
    voip: null,
  }
  static propTypes = {
    voip: PropTypes.array,
    navigation: PropTypes.object,
  }

  _renderContentComponent = item => {
    return (
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.sip ? item.sip.trim() : item.pstn.trim()}</Text>
        <Text style={styles.itemText}>{strings('PLAN') + ': ' + item.plan.name.trim()}</Text>
      </View>
    )
  }

  _renderTitleComponent = () => {
    return (
      <View style={styles.header}>
        <Image source={voip} width={50} height={50} style={styles.headerIcon} />
        <Text style={styles.headerTitle}>{strings('VOIP_TITLE')}</Text>
      </View>
    )
  }

  _handleItemPress = item => {
    requestAnimationFrame(async () => {
      this.props.navigation.navigate(Routes.VoipInfo, { voip: item })
    })
  }

  render() {
    return (
      <ServiceContainer
        noItemText={strings('NO_VOIP')}
        onPress={this._handleItemPress}
        services={this.props.voip}
        contentComponent={this._renderContentComponent}
        titleComponent={this._renderTitleComponent()}
      />
    )
  }
}

export default withNavigation(VoipContainer)
