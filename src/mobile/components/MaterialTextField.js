import React, {Component, PropTypes} from 'react'
import {View, TextInput, Animated, StyleSheet, Platform} from 'react-native'

import colors from '../../common/constants/colors'

import {getLabelSize, getLabelPosition, ANIMATION_DURATION} from '../dimensions'

export default class MaterialTextField extends Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    multiline: PropTypes.bool,
    isError: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      labelColor: colors.secondaryText,
      underlineWidth: new Animated.Value(0),
      labelSize: new Animated.Value(getLabelSize(props.value)),
      labelPosition: new Animated.Value(getLabelPosition(props.value)),
      height: 0,
    }
    this.focus = this.focus.bind(this)
    this.blur = this.blur.bind(this)
    this.ref = this.ref.bind(this)
    this.handleLayout = this.handleLayout.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleContentSizeChange = this.handleContentSizeChange.bind(this)
  }

  componentWillReceiveProps(props) {
    if (!this.props.value && props.value && !this.focused) {
      this.setState({
        labelSize: getLabelSize(true),
        labelPosition: getLabelPosition(true),
      })
    }
  }

  focus() {
    if (this.input) {
      this.input.focus()
    }
  }

  blur() {
    if (this.input) {
      this.input.blur()
    }
  }

  ref(input) {
    this.input = input
  }

  handleLayout(event) {
    this.width = event.nativeEvent.layout.width
  }

  handleFocus() {
    this.setState({
      labelColor: colors.main,
    })
    Animated.timing(this.state.underlineWidth, {
      toValue: this.width,
      duration: ANIMATION_DURATION,
    }).start()
    Animated.timing(this.state.labelSize, {
      toValue: getLabelSize(true),
      duration: ANIMATION_DURATION,
    }).start()
    Animated.timing(this.state.labelPosition, {
      toValue: getLabelPosition(true),
      duration: ANIMATION_DURATION,
    }).start()
    if (this.props.onFocus) {
      this.props.onFocus()
    }
    this.focused = true
  }

  handleBlur() {
    this.setState({
      labelColor: colors.secondaryText,
    })
    Animated.timing(this.state.underlineWidth, {
      toValue: 0,
      duration: ANIMATION_DURATION,
    }).start()
    if (!this.props.value) {
      Animated.timing(this.state.labelSize, {
        toValue: getLabelSize(false),
        duration: ANIMATION_DURATION,
      }).start()
      Animated.timing(this.state.labelPosition, {
        toValue: getLabelPosition(false),
        duration: ANIMATION_DURATION,
      }).start()
    }
    if (this.props.onBlur) {
      this.props.onBlur()
    }
    this.focused = false
  }

  handleContentSizeChange(event) {
    if (this.props.multiline) {
      this.setState({
        height: event.nativeEvent.contentSize.height,
      })
    }
  }

  render() {
    const {label, isError, ...props} = this.props

    const inputStyle = {
      height: Math.max(34, this.state.height),
    }

    const underlineStyle = {
      width: this.state.underlineWidth,
      height: 1.6,
      backgroundColor: isError ? colors.error : colors.main,
    }

    const labelStyle = {
      fontSize: this.state.labelSize,
      position: 'absolute',
      top: this.state.labelPosition,
      color: isError ? colors.error : this.state.labelColor,
      backgroundColor: 'transparent',
    }

    return (
      <View style={styles.wrapper}>
        <Animated.Text style={labelStyle} numberOfLines={1}>
          {label}
        </Animated.Text>
        <TextInput ref={this.ref}
          underlineColorAndroid="transparent"
          autoCapitalize="sentences"
          {...props}
          onContentSizeChange={this.handleContentSizeChange}
          style={[styles.input, inputStyle]}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <View style={styles.underline} onLayout={this.handleLayout}>
          <Animated.View style={underlineStyle} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 30,
    //paddingBottom: 7,
    position: 'relative',
  },
  input: {
    fontSize: 16,
    //height: 34,
    lineHeight: 34,
    paddingHorizontal: 0,
    paddingVertical: (Platform.OS === 'ios' ? 0 : 6),
    color: colors.primaryText,
  },
  underline: {
    height: 0.8,
    alignItems: 'center',
    backgroundColor: colors.underline,
  },
})
