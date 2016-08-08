import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {connect} from 'react-redux'

import Icon from 'react-native-vector-icons/MaterialIcons'

import Touchable from './Touchable'
import FormattedMessage from './FormattedMessage'
import FormattedRelative from './FormattedRelative'

import routes from '../../common/routes'
import router from '../../common/router'
import colors from '../../common/constants/colors'
import {elevation} from '../dimensions'

class ActivityCard extends Component {
  static propTypes = {
    // from parent:
    type: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    // from redux:
    userMap: PropTypes.object.isRequired,
    uid: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
  }

  handlePress(type, row) {
    const route = routes[type.toUpperCase()]

    if (type === 'note') {
      router.resetTo(routes.NOTES) // TODO: needs push but breaks navigation
    } else {
      route.props = {
        id: row.id || row.uid,
      }
      route.title = row.name

      router.push(route)
    }
  }

  renderItem(row) {
    let author
    if (row.author) {
      const authorObj = this.props.userMap[row.author]
      if (!authorObj) { // might not be available when switching tribe
        return null
      }
      author = authorObj.name
    }

    const type = this.props.type.slice(0, -1) // plural => singular

    let date = row.added
    let textId = null
    let values = null

    switch (type) {
      case 'member':
        date = row.joined
        break
      case 'poll':
        textId = 'asked_by'
        values = {author}
        break
      case 'task':
        //nothing
        break
      case 'bill':
        if (row.part) {
          textId = 'bill.mypart'
          values = {amount: row.part}
        } else {
          textId = 'bill.nopart'
        }
        break
      case 'event':
        const start = new Date(row.start)
        const suffix = (start.getHours() !== 0 || start.getMinutes() !== 0) ? 'time' : ''
        if (row.end) {
          textId = 'interval' + suffix
          values = {start: row.start, end: row.end}
        } else {
          textId = 'date' + suffix
          values = {date: row.start}
        }
        break
      case 'note':
        textId = 'notes.by'
        values = {author}
        break
    }

    return (
      <Touchable key={row.id || row.uid} style={styles.itemContainer} onPress={this.handlePress.bind(this, type, row)}>
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{row.name}</Text>
          {textId && <FormattedMessage style={styles.itemText} id={textId} values={values} />}
        </View>
        <FormattedRelative value={date} style={styles.itemTime} />
      </Touchable>
    )
  }

  //TODO: toggables cards

  render() {
    const {type, data} = this.props

    if (!data.length) {
      return null
    }

    const route = routes[type.toUpperCase()]
    const color = colors[route.name]

    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Icon name={route.icon} color={color} size={30} />
        </View>
        <View style={styles.content}>
          <FormattedMessage id={'activity.' + type} values={{num: data.length}} style={styles.title} />
          {
            data.map(this.renderItem)
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    marginTop: 8,
    marginHorizontal: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    ...elevation(1),
  },
  iconContainer: {
    paddingRight: 16,
    borderRightWidth: 1,
    borderRightColor: colors.underline,
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 18,
    color: colors.primaryText,
    paddingBottom: 4,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1, // to wrap
  },
  itemTitle: {
    color: colors.main,
  },
  itemText: {
    color: colors.secondaryText,
    paddingBottom: 6, //TODO: this is a hack to fix the cropped overflow bug: http://stackoverflow.com/questions/38779726
  },
  itemTime: {
    fontStyle: 'italic',
    color: colors.secondaryText,
    marginLeft: 16,
  },
})

const mapStateToProps = (state) => ({
  userMap: state.tribe.userMap,
  uid: state.user.uid,
})

export default connect(mapStateToProps)(ActivityCard)
