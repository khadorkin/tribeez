import React, {Component, PropTypes} from 'react'
import {Image, View, StyleSheet} from 'react-native'

import Touchable from '../components/Touchable'
import IconButton from '../components/IconButton'

import colors from '../../common/constants/colors'
import gravatar from '../../common/utils/gravatar'

class ListItem extends Component {
  static propTypes = {
    // from parent component
    onPress: PropTypes.func,
    style: View.propTypes.style,
    user: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    icon: PropTypes.string,
    onIconPress: PropTypes.func,
  }

  render() {
    const {onPress, style, user, children, icon, onIconPress} = this.props

    const action = icon && (
      <IconButton name={icon} onPress={onIconPress} style={styles.icon} />
    )

    return (
      <Touchable onPress={onPress} style={[styles.container, style]}>
        <Image
          source={{uri: gravatar(user)}}
          style={styles.avatar}
        />
        <View style={styles.content}>
          <View style={styles.text}>
            {children}
          </View>
          {action}
        </View>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    paddingTop: 12,
    flexDirection: 'row',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 12,
    paddingRight: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.underline,
    marginTop: -1,
  },
  text: {
    flex: 1,
  },
  icon: {
    paddingVertical: 6,
  },
})

export default ListItem
