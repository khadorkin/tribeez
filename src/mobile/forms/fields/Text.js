import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {injectIntl, intlShape} from 'react-intl'

import MaterialTextField from '../../components/MaterialTextField'
import FormattedMessage from '../../components/FormattedMessage'

import colors from '../../../common/constants/colors'

class TextField extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    labelId: PropTypes.string,
    errorIsCustom: PropTypes.bool,
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
    const {intl, input: {name, value, ...input}, meta: {touched, error}, labelId, errorIsCustom, currency, ...props} = this.props

    const label = labelId || name

    let errorMessage
    if (touched && error) {
      errorMessage = 'error.'
      if (errorIsCustom) {
        errorMessage += name + '_' + error
      } else {
        errorMessage += label
      }
    }

    const currencyLabel = currency && (
      <Text style={styles.currency}>{currency}</Text>
    )

    return (
      <View style={styles.container}>
        <MaterialTextField ref={this.ref}
          value={String(value)}
          label={intl.formatMessage({id: 'field.' + label})}
          keyboardType={currency && 'numeric'}
          isError={Boolean(touched && error)}
          {...input}
          {...props}
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
    marginBottom: 8,
  },
  currency: {
    position: 'absolute',
    top: 39,
    right: 0,
    color: colors.secondaryText,
  },
  error: {
    fontSize: 12,
    color: colors.error,
    marginVertical: 8,
  },
})

export default injectIntl(TextField, {withRef: true})
