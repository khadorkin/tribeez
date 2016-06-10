import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'

import {connect} from 'react-redux'

import FormattedRelative from './FormattedRelative'

import colors from '../../common/constants/colors'
import gravatar from '../../common/utils/gravatar'

class Comment extends Component {
  static propTypes = {
    // from parent:
    comment: PropTypes.object.isRequired,
    // from redux:
    users: PropTypes.array.isRequired,
  }

  render() {
    const {comment} = this.props

    const author = this.props.users.find((u) => u.id === comment.author_id)

    return (
      <View style={styles.container}>
        <Image
          source={{uri: gravatar(author)}}
          style={styles.avatar}
        />
        <View style={styles.titles}>
          <Text style={styles.title}>{comment.content}</Text>
          <FormattedRelative value={comment.added} style={styles.subtitle} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.member.tribe.users,
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  titles: {
    flex: 1,
  },
  title: {
    color: colors.primaryText,
  },
  subtitle: {
    color: colors.secondaryText,
  },
})

export default connect(mapStateToProps)(Comment)
