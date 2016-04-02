import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import RaisedButton from 'material-ui/lib/raised-button'

class AsyncContent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      uid: null,
    }
  }

  componentWillMount() {
    if (this.props.uid) {
      this.setState({
        uid: this.props.uid,
      })
      this.props.onLoad()
    }
  }

  componentWillReceiveProps(props) {
    if (props.uid && !this.state.uid) {
      this.setState({
        uid: props.uid,
      })
      this.props.onLoad()
    }
  }

  render() {
    const {error} = this.props

    if (error) {
      return (
        <div style={{textAlign: 'center', padding: '40px 0'}}>
          <div style={{marginBottom: 20, color: 'red'}}>Error: {error}</div>
          <RaisedButton label="Retry" onTouchTap={this.props.onLoad} />
        </div>
      )
    } else {
      return (
        <div style={this.props.style}>
          {this.props.children}
        </div>
      )
    }
  }

}

AsyncContent.propTypes = {
  // redux state
  uid: PropTypes.number,
  // from parent component
  onLoad: PropTypes.func.isRequired,
  error: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
}

const mapStateToProps = (state) => ({
  uid: state.member.user.id,
})

export default connect(mapStateToProps)(AsyncContent)
