import React, {Component, PropTypes} from 'react'
import {TextInput} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

class TextArea extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    style: TextInput.propTypes.style,
    minHeight: PropTypes.number,
    onChange: PropTypes.func,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    id: PropTypes.string, // used in componentWillReceiveProps to detect initial height change
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
      height: event.nativeEvent.contentSize.height + 24,
    })
  }

  render() {
    const {intl, style, minHeight, placeholder, ...props} = this.props

    let translatedPlaceholder
    if (placeholder) {
      translatedPlaceholder = intl.formatMessage({id: 'placeholder.' + placeholder})
    }

    const height = Math.max(minHeight || 39, this.state.height)

    return (
      <TextInput
        underlineColorAndroid="transparent"
        {...props}
        placeholder={translatedPlaceholder}
        multiline={true}
        style={[style, {height}]}
        onContentSizeChange={this.handleContentSizeChange}
      />
    )
  }
}

export default injectIntl(TextArea)
