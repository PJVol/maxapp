import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { GET_MESSAGES, MARK_READ } from '../../store/messages/actions'
import { logInfo } from '../../utils'
import { Page } from '../../components'

class Messages extends React.Component {
  static propTypes = {
    getMessages: PropTypes.func,
    markRead: PropTypes.func,
    messages: PropTypes.object,
  }

  state = {
    refreshing: false,
  }

  constructor(props) {
    super(props)
    this.props.getMessages()
  }

  componentDidMount() {
    logInfo(this.constructor.name + ' did mount')
  }

  componentWillUnmount() {
    logInfo(this.constructor.name + ' will unmount')
  }

  render() {
    return (
      <Page
        title={null}
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

const mapStateToProps = state => ({
  messages: state.messages.list,
})
const mapDispatchToProps = dispatch => {
  return {
    getMessages: () => dispatch({ type: GET_MESSAGES }),
    markRead: id => dispatch({ type: MARK_READ, payload: { id } }),
    dispatch,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Messages)
