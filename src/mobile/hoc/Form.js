import React, {Component, PropTypes} from 'react'
import {StyleSheet, View} from 'react-native'

import Button from '../components/Button'
import FormattedMessage from '../components/FormattedMessage'

import colors from '../../common/constants/colors'

class Form extends Component {
  static propTypes = {
    // from parent:
    children: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
    error: PropTypes.string,
    style: View.propTypes.style,
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    this.props.handleSubmit(this.props.action)(event)
  }

  render() {
    const {style, children, name, submitting, error} = this.props

    return (
      <View style={[styles.container, style]}>
        {children}
        <FormattedMessage id={error && 'error.' + error} style={styles.error} />
        <Button id={'submit.' + name} onPress={this.handleSubmit} loading={submitting} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  error: {
    color: colors.error,
    padding: 8,
    textAlign: 'center',
  },
})

export default Form
