import React, {Component, PropTypes} from 'react'
import {ActivityIndicatorIOS} from 'react-native'

export default class Spinner extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
  }
  render() {
    if (!this.props.visible) {
      return null
    }
    return <ActivityIndicatorIOS animating={true} size="small" />
  }
}
