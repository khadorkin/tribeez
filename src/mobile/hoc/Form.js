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
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    this.props.handleSubmit(this.props.action)(event)
  }

  render() {
    const {children, name, submitting, error} = this.props

    return (
      <View style={styles.container}>
        {children}
        <View style={styles.actions}>
          <Button id={'submit.' + name} onPress={this.handleSubmit} disabled={submitting} />
        </View>
        <FormattedMessage id={error && 'error.' + error} style={styles.error} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: 'white',
  },
  actions: {
    alignItems: 'center',
  },
  error: {
    color: colors.error,
    textAlign: 'center',
  },
})

export default Form
