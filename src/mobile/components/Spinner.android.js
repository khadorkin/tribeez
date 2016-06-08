import React, {Component, PropTypes} from 'react'
import {ProgressBarAndroid} from 'react-native'

//TODO: use ActivityIndicator when migrating RN to 0.28+

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
