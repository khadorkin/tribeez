import React, {Component, PropTypes} from 'react'
import {Picker, StyleSheet, View} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

import FormattedMessage from '../../components/FormattedMessage'

import colors from '../../../common/constants/colors'

class SelectField extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const {input, items} = this.props
    //TODO: allow no default value
    if (!input.value) {
      input.onChange(items[0].code)
    }
  }

  handleChange(value) {
    this.props.input.onChange(value)
  }

  render() {
    const {intl, items, input: {name, value}, meta: {touched, error}} = this.props

    const children = items.map((item) =>
      <Picker.Item label={item.name || intl.formatMessage({id: 'select.' + item.code})} value={item.code} key={item.code} />
    )

    const labelStyle = {
      color: (touched && error) ? colors.error : colors.secondaryText,
    }

    return (
      <View style={styles.container}>
        <FormattedMessage id={'field.' + name} style={[styles.label, labelStyle]} />
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
    marginBottom: 8,
    marginTop: 16,
  },
  label: {
    marginHorizontal: 8,
    fontSize: 12,
  },
  picker: {
    height: 32,
    marginRight: 16,
  },
  bottom: {
    marginHorizontal: 8,
    borderBottomWidth: 0.8,
    borderBottomColor: colors.underline,
  },
  error: {
    fontSize: 12,
    color: colors.error,
    margin: 8,
  },
})

export default injectIntl(SelectField)
