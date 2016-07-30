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
  }

  constructor(props) {
    super(props)
    this.ref = this.ref.bind(this)
    this.focus = this.focus.bind(this)
  }

  ref(element) {
    this.element = element
  }

  focus() {
    this.element.focus()
  }

  render() {
    const {intl, name, value, touched, error, currency, ...props} = this.props
    let {errorId} = this.props

    errorId = error && ('error.' + (errorId || name))

    const currencyLabel = currency && (
      <Text style={styles.currency}>{currency}</Text>
    )

    return (
      <View style={styles.container}>
        <MKTextField ref={this.ref}
          value={String(value)}
          placeholder={intl.formatMessage({id: 'field.' + name})}
          floatingLabelEnabled={true}
          highlightColor={colors.input} // Color of highlighted underline & floating label
          style={styles.field}
          textInputStyle={styles.input}
          keyboardType={currency && 'numeric'}
          {...props}
        />
        {currencyLabel}
        <FormattedMessage id={touched && errorId} style={styles.error} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
  },
  field: {
    //
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
