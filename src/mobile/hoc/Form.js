import React, {Component, PropTypes} from 'react'
import {StyleSheet, View} from 'react-native'

import Button from '../components/Button'
import FormattedMessage from '../components/FormattedMessage'

class Form extends Component {
  static propTypes = {
    // from parent:
    children: PropTypes.node,
    name: PropTypes.string,
    action: PropTypes.func,
    handleSubmit: PropTypes.func,
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
        {error && <FormattedMessage id={error} style={styles.error} />}
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
    color: 'red',
  },
})

export default Form
