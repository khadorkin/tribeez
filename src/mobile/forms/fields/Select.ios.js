import React, {Component, PropTypes} from 'react'
import {Picker, StyleSheet, View, Text, Modal, Dimensions} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

import FormattedMessage from '../../components/FormattedMessage'
import Touchable from '../../components/Touchable'
import Button from '../../components/Button'

import colors from '../../../common/constants/colors'

import {elevation} from '../../dimensions'

class SelectField extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    error: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleChange(value/*, index*/) {
    this.props.onChange(value)
  }

  handleOpen() {
    this.setState({
      showModal: true,
    })
  }

  handleClose() {
    this.setState({
      showModal: false,
    })
  }

  render() {
    const {intl, name, value, items, error/*, ...props*/} = this.props

    let valueName
    const children = items.map((item) => {
      const label = item.name || intl.formatMessage({id: 'select.' + item.code})
      if (item.code === value) {
        valueName = label
      }
      return <Picker.Item label={label} value={item.code} key={item.code} />
    })

    return (
      <View style={styles.container}>
        <FormattedMessage id={'field.' + name} style={styles.label} />
        <Touchable onPress={this.handleOpen} style={styles.valueContainer}>
          <Text style={styles.value}>{valueName}</Text>
        </Touchable>
        <FormattedMessage id={error && 'error.' + name} style={styles.error} />
        <Modal animationType="fade" visible={this.state.showModal} onRequestClose={this.handleClose} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Picker selectedValue={value} onValueChange={this.handleChange}>
                {children}
              </Picker>
              <Button id="ok" onPress={this.handleClose} />
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
  },
  label: {
    fontSize: 12,
    color: colors.secondaryText,
  },
  valueContainer: {
    borderBottomWidth: 0.8,
    borderBottomColor: colors.underline,
    paddingTop: 6,
    paddingBottom: 9,
  },
  value: {
    fontSize: 16,
  },
  error: {
    color: colors.error,
    margin: 8,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.overlay,
    ...elevation(6),
  },
  modalContent: {
    backgroundColor: colors.background,
    width: Dimensions.get('window').width * 0.8,
  },
})

export default injectIntl(SelectField)
