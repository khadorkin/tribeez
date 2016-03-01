import React, {Component, PropTypes} from 'react'

import RaisedButton from 'material-ui/lib/raised-button'

import css from './Error.css'

class Error extends Component {

  render() {
    return (
      <div className={css.container}>
        <div className={css.message}>Error: {this.props.message}</div>
        <RaisedButton label={this.props.label || 'Retry'} onTouchTap={this.props.onRetry} containerElement={this.props.containerElement} />
      </div>
    )
  }

}

Error.propTypes = {
  label: PropTypes.string,
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
  containerElement: PropTypes.node,
}

export default Error
