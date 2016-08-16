import React, {Component, PropTypes} from 'react'
import {View, TextInput, StyleSheet} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

import Avatar from './Avatar'

class CommentBox extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    user: PropTypes.object.isRequired,
  }

  render() {
    const {intl, user, ...props} = this.props
    return (
      <View style={styles.container}>
        <Avatar user={user} />
        <TextInput
          underlineColorAndroid="transparent"
          placeholder={intl.formatMessage({id: 'comment'})}
          style={styles.input}
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
    marginLeft: 12,
    paddingVertical: 12,
  },
})

export default injectIntl(CommentBox)
