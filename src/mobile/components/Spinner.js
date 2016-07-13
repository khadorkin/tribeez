import React, {Component, PropTypes} from 'react'
import {ActivityIndicator, View} from 'react-native'

import colors from '../../common/constants/colors'

class Spinner extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    color: PropTypes.string,
    style: View.propTypes.style,
  }
  render() {
    const color = this.props.color || colors.main
    return <ActivityIndicator animating={this.props.visible} size="small" color={color} style={this.props.style} />
  }
}

export default Spinner
