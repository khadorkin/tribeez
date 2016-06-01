import React, {Component, PropTypes} from 'react'
import {ProgressBarAndroid} from 'react-native'

export default class Spinner extends Component {
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
