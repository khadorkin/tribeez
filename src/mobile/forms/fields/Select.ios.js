import React, {Component, PropTypes} from 'react'
import {Picker, StyleSheet, View, Text, Modal, Dimensions, Animated} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

import FormattedMessage from '../../components/FormattedMessage'
import Touchable from '../../components/Touchable'
import Button from '../../components/Button'

import colors from '../../../common/constants/colors'

import {elevation, getLabelSize, getLabelPosition, ANIMATION_DURATION} from '../../dimensions'

class SelectField extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      labelSize: new Animated.Value(getLabelSize(props.input.value)),
      labelPosition: new Animated.Value(getLabelPosition(props.input.value)),
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  componentWillReceiveProps(props) {
    const hasValue = Boolean(props.input.value)
    if (hasValue !== Boolean(this.props.input.value)) {
      Animated.timing(this.state.labelSize, {
        toValue: getLabelSize(hasValue),
        duration: ANIMATION_DURATION,
      }).start()
      Animated.timing(this.state.labelPosition, {
        toValue: getLabelPosition(hasValue),
        duration: ANIMATION_DURATION,
      }).start()
    }
  }

  handleChange(value) {
    this.props.input.onChange(value)
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

    const {input, items} = this.props
    // default value = first proposal (this behavior could be improved)
    if (!input.value) {
      input.onChange(items[0].code)
    }
  }

  render() {
    const {intl, items, input: {name, value}, meta: {touched, error}} = this.props

    let valueName = ' '
    const children = items.map((item) => {
      const label = item.name || intl.formatMessage({id: 'select.' + item.code})
      if (item.code === value) {
        valueName = label
      }
      return <Picker.Item label={label} value={item.code} key={item.code} />
    })

    const labelStyle = {
      fontSize: this.state.labelSize,
      position: 'absolute',
      top: this.state.labelPosition,
      color: (touched && error) ? colors.error : colors.secondaryText,
      backgroundColor: 'transparent',
    }

    return (
      <View style={styles.container}>
        <Touchable onPress={this.handleOpen} style={styles.valueContainer}>
          <Text style={styles.value}>{valueName}</Text>
        </Touchable>
        <Animated.Text style={labelStyle} onPress={this.handleOpen} numberOfLines={1}>
          {intl.formatMessage({id: 'field.' + name})}
        </Animated.Text>
        <FormattedMessage id={touched && error && 'error.' + name} style={styles.error} />
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
    position: 'relative',
    marginBottom: 8,
  },
  valueContainer: {
    borderBottomWidth: 0.8,
    borderBottomColor: colors.underline,
    paddingTop: 36,
    paddingBottom: 9,
  },
  value: {
    fontSize: 16,
    color: colors.primaryText,
  },
  error: {
    fontSize: 12,
    color: colors.error,
    marginVertical: 8,
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
