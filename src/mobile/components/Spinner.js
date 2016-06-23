import React, {Component, PropTypes} from 'react'
import {ActivityIndicator} from 'react-native'

import colors from '../../common/constants/colors'

class Spinner extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
  }
  render() {
    return <ActivityIndicator animating={this.props.visible} size="small" color={colors.main} />
  }
}

export default Spinner
