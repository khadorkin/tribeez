import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {injectIntl, intlShape} from 'react-intl'

import {MKTextField} from 'react-native-material-kit'

import FormattedMessage from '../../components/FormattedMessage'

import colors from '../../../common/constants/colors'

class TextField extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    touched: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    errorId: PropTypes.string,
    currency: PropTypes.string,
    multiline: PropTypes.bool,
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      height: null, // only used when props.multiline
    }
    this.ref = this.ref.bind(this)
    this.focus = this.focus.bind(this)
    this.handleContentSizeChange = this.handleContentSizeChange.bind(this)
  }

  ref(element) {
    this.element = element
  }

  focus() {
    this.element.focus()
  }

  handleContentSizeChange(event) {
    if (this.props.multiline) {
      this.setState({
        height: event.nativeEvent.contentSize.height + 24,
      })
    }
  }

  render() {
    const {intl, name, value, touched, error, errorId, currency, ...props} = this.props

    const errorMessage = touched && error && ('error.' + (errorId || name))

    const currencyLabel = currency && (
      <Text style={styles.currency}>{currency}</Text>
    )

    const fieldStyle = {}
    if (this.state.height) {
      fieldStyle.height = Math.max(54, this.state.height)
    }

    return (
      <View style={styles.container}>
        <MKTextField ref={this.ref}
          value={String(value)}
          placeholder={intl.formatMessage({id: 'field.' + name})}
          floatingLabelEnabled={true}
          highlightColor={colors.input} // Color of highlighted underline & floating label
          style={fieldStyle} // must be set even if empty, otherwise the height of the fields is broken
          textInputStyle={styles.input}
          keyboardType={currency && 'numeric'}
          {...props}
          onContentSizeChange={this.handleContentSizeChange}
        />
        {currencyLabel}
        <FormattedMessage id={errorMessage} style={styles.error} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
  },
  input: {
    color: colors.text,
  },
  currency: {
    position: 'absolute',
    top: 28,
    right: 0,
  },
  error: {
    color: colors.error,
    marginVertical: 8,
  },
})

export default injectIntl(TextField, {withRef: true})
