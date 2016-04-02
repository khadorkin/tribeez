import React, {Component, PropTypes} from 'react'

import RaisedButton from 'material-ui/lib/raised-button'

class AsyncContent extends Component {

  componentWillMount() {
    this.props.onLoad()
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
  // from parent component
  onLoad: PropTypes.func.isRequired,
  error: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
}

export default AsyncContent
