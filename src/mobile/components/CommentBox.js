import React, {Component, PropTypes} from 'react'
import {View, TextInput, StyleSheet} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

import Avatar from './Avatar'

class CommentBox extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    user: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      height: 0,
    }
    this.handleContentSizeChange = this.handleContentSizeChange.bind(this)
  }

  handleContentSizeChange(event) {
    this.setState({
      height: event.nativeEvent.contentSize.height,
    })
  }

  render() {
    const {intl, user, ...props} = this.props

    const inputStyle = {
      height: Math.max(34, this.state.height),
    }

    return (
      <View style={styles.container}>
        <Avatar user={user} />
        <TextInput
          ref="input"
          underlineColorAndroid="transparent"
          placeholder={intl.formatMessage({id: 'comment'})}
          style={[styles.input, inputStyle]}
          multiline={true}
          blurOnSubmit={true}
          onContentSizeChange={this.handleContentSizeChange}
          {...props}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 16,
    fontSize: 14,
  },
})

export default injectIntl(CommentBox, {withRef: true})
