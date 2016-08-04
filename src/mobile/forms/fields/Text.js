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
    this.handleLayout = this.handleLayout.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  ref(element) {
    this.element = element
  }

  focus() {
    this.element.focus()
  }

  handleLayout(event) {
    this.setState({
      height: event.nativeEvent.layout.height + 10,
    })
  }

  handleChange(event) {
    if (this.props.multiline) {
      this.setState({
        height: event.nativeEvent.contentSize.height + 25, // layout height = input height + 25
      })
    }
    if (this.props.onChange) {
      this.props.onChange(event)
    }
  }

  render() {
    const {intl, name, value, touched, error, errorId, currency, ...props} = this.props

    const errorMessage = touched && error && ('error.' + (errorId || name))

    const currencyLabel = currency && (
      <Text style={styles.currency}>{currency}</Text>
    )

    const fieldStyle = {}
    if (props.multiline) {
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
          onChange={this.handleChange}
        />
        { // this is a hack to calculate the initial height:
          props.multiline && !this.state.height && (
            <Text style={styles.hidden} onLayout={this.handleLayout}>{String(props.value || 'x')}</Text>
          )
        }
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
  hidden: {
    position: 'absolute',
    left: 10000,
    paddingVertical: 10,
    fontSize: 16,
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
