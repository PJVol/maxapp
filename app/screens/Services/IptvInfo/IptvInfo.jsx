import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logInfo } from '../../../utils'
import { Page } from '../../../components'
import { GET_MESSAGES } from '../../../store/messages/actions'

class ServiceInfoScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    getMessages: PropTypes.func,
  }

  state = {
    refreshing: false,
  }

  componentDidMount() {
    logInfo(this.constructor.name + ' did mount')
  }

  componentWillUnmount() {
    logInfo(this.constructor.name + ' will unmount')
  }

  render() {
    const iptv = this.props.navigation.getParam('iptv', null)

    return (
      <Page
        title={iptv.comment != '' ? iptv.comment.trim() : iptv.device.trim()}
        refreshEnabled={true}
        refreshing={this.state.refreshing}
        onRefresh={() => {
          this.setState({ refreshing: true })
          this.props.getMessages()
          this.setState({ refreshing: false })
        }}
      />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMessages: () => dispatch({ type: GET_MESSAGES }),
  }
}

export default connect(mapDispatchToProps)(ServiceInfoScreen)
