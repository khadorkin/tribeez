import React, {Component, PropTypes} from 'react'
import {View, StyleSheet} from 'react-native'

import Touchable from '../components/Touchable'
import Avatar from '../components/Avatar'
import IconButton from '../components/IconButton'

import colors from '../../common/constants/colors'

class ListItem extends Component {
  static propTypes = {
    // from parent component
    onPress: PropTypes.func,
    style: View.propTypes.style,
    user: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    rightLabel: PropTypes.node,
    icon: PropTypes.string,
    onIconPress: PropTypes.func,
  }

  render() {
    const {onPress, style, user, children, rightLabel, icon, onIconPress} = this.props

    const action = icon && (
      <IconButton name={icon} onPress={onIconPress} style={styles.icon} size={24} color={colors.members} />
    )

    return (
      <View>
        <Touchable onPress={onPress} style={[styles.container, style]}>
          <Avatar user={user} style={styles.avatar} />
          <View style={styles.content}>
            <View style={styles.text}>
              {children}
            </View>
            {rightLabel}
          </View>
        </Touchable>
        {action}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.underline,
    minHeight: 64,
  },
  avatar: {
    marginRight: 16,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    flex: 1,
  },
  icon: {
    padding: 12,
    margin: 0,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
})

export default ListItem
