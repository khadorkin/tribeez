import React, {Component, PropTypes} from 'react'
import {Picker, StyleSheet, View} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

import FormattedMessage from '../../components/FormattedMessage'

import colors from '../../../common/constants/colors'

class SelectField extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value/*, index*/) {
    this.props.onChange(value)
  }

  render() {
    const {intl, name, value, items, error/*, ...props*/} = this.props

    const children = items.map((item) =>
      <Picker.Item label={item.name || intl.formatMessage({id: 'select.' + item.code})} value={item.code} key={item.code} />
    )

    return (
      <View style={styles.container}>
        <FormattedMessage id={'field.' + name} style={styles.label} />
        <Picker selectedValue={value} onValueChange={this.handleChange} style={styles.picker}>
          {children}
        </Picker>
        <View style={styles.bottom} />
        <FormattedMessage id={error && 'error.' + name} style={styles.error} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    //
  },
  label: {
    marginHorizontal: 8,
    fontSize: 12,
  },
  picker: {
    height: 30,
  },
  bottom: {
    marginHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.underline,
  },
  error: {
    color: colors.error,
    margin: 8,
  },
})

export default injectIntl(SelectField)
