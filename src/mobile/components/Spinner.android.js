import React, {Component, PropTypes} from 'react'
import {ProgressBarAndroid} from 'react-native'

class Spinner extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
  }
  render() {
    if (!this.props.visible) {
      return null
    }
    return <ProgressBarAndroid styleAttr="Small" indeterminate={true} />
  }
}

export default Spinner
