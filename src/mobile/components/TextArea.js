import React, {Component, PropTypes} from 'react'
import {TextInput, StyleSheet, View, Text} from 'react-native'

import colors from '../../common/constants/colors'

class TextArea extends Component {
  static propTypes = {
    style: Text.propTypes.style,
    minHeight: PropTypes.number,
    onChange: PropTypes.func,
    value: PropTypes.string.isRequired,
    id: PropTypes.string, // used in componentWillReceiveProps to detect initial height change
  }

  constructor(props) {
    super(props)
    this.state = {
      height: null,
    }
    this.handleLayout = this.handleLayout.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(props) {
    if (props.id && props.id !== this.props.id) {
      this.setState({
        height: null, // re-trigger height calculation by mounting the <Text>
      })
    }
  }

  handleLayout(event) {
    this.setState({
      height: event.nativeEvent.layout.height,
    })
  }

  handleChange(event) {
    this.setState({
      height: event.nativeEvent.contentSize.height,
    })
    if (this.props.onChange) {
      this.props.onChange(event)
    }
  }

  render() {
    const {style, minHeight, ...props} = this.props

    const height = Math.max(minHeight || 39, this.state.height)

    return (
      <View style={styles.container}>
        <TextInput
          underlineColorAndroid={colors.underline}
          {...props}
          multiline={true}
          style={[style, {height}]}
          onChange={this.handleChange}
        />
        { // this is a hack to calculate the initial height:
          !this.state.height && (
            <Text style={[style, styles.hidden]} onLayout={this.handleLayout}>{props.value || 'x'}</Text>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  hidden: {
    position: 'absolute',
    left: 10000,
    paddingVertical: 10,
  },
})

export default TextArea
