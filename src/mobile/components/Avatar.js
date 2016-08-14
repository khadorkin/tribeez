import React, {Component, PropTypes} from 'react'
import {Image} from 'react-native'

import gravatar from '../../common/utils/gravatar'

class Avatar extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    size: PropTypes.number,
    style: Image.propTypes.style,
  }

  constructor(props) {
    super(props)
    this.ref = this.ref.bind(this)
  }

  ref(element) {
    this.element = element
  }

  setNativeProps(nativeProps) {
    this.element.setNativeProps(nativeProps)
  }

  render() {
    const {user, size, style, ...props} = this.props

    const width = size || 40

    const defaultStyle = {
      width,
      height: width,
      borderRadius: (width / 2),
    }

    return (
      <Image
        ref={this.ref}
        source={{uri: gravatar(user, width * 2)}}
        style={[defaultStyle, style]}
        {...props}
      />
    )
  }
}

export default Avatar
