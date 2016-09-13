import React, {Component, PropTypes} from 'react'
import {TextInput} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

class TextArea extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    style: TextInput.propTypes.style,
    minHeight: PropTypes.number,
    placeholder: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      height: null,
    }
    this.handleContentSizeChange = this.handleContentSizeChange.bind(this)
  }

  handleContentSizeChange(event) {
    this.setState({
      height: event.nativeEvent.contentSize.height + 4,
    })
  }

  render() {
    const {intl, style, minHeight, placeholder, ...props} = this.props

    let translatedPlaceholder
    if (placeholder) {
      translatedPlaceholder = intl.formatMessage({id: 'placeholder.' + placeholder})
    }

    const height = Math.max(minHeight || 0, this.state.height)

    return (
      <TextInput
        underlineColorAndroid="transparent"
        {...props}
        placeholder={translatedPlaceholder}
        multiline={true}
        style={[style, {height}]}
        onContentSizeChange={this.handleContentSizeChange} // triggered on mount too
      />
    )
  }
}

export default injectIntl(TextArea)
