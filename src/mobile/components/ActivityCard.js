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

const sorters = {
  members: {date: 'joined', sort: 'desc'},
  polls: {date: 'added', sort: 'asc'},
  tasks: {date: 'done', sort: 'asc'},
  bills: {date: 'added', sort: 'desc'},
  events: {date: 'start', sort: 'asc'},
  notes: {date: 'updated', sort: 'desc'},
}

class ActivityCard extends Component {
  static propTypes = {
    // from parent:
    type: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    // from redux:
    userMap: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
  }

  handlePress(type, row) {
    if (type === 'notes') {
      router.resetTo(routes.NOTES) // TODO: needs push but breaks navigation
    } else {
      const route = routes[type.slice(0, -1).toUpperCase()]
      route.props = {
        id: row.id || row.uid,
      }
      route.title = row.name
      router.push(route)
    }
  }

  renderItem(row) {
    const {type, userMap} = this.props

    let author
    if (row.author) {
      const authorObj = userMap[row.author]
      if (!authorObj) { // might not be available when switching tribe
        return null
      }
      author = authorObj.name
    }

    const date = row[sorters[type].date]
    let textId
    let values
    let dateFallback

    switch (type) {
      case 'members':
        break
      case 'polls':
        textId = 'asked_by'
        values = {author}
        break
      case 'tasks':
        dateFallback = 'never_done'
        break
      case 'bills':
        if (row.part) {
          textId = 'bill.mypart'
          values = {amount: row.part}
        } else {
          textId = 'bill.nopart'
        }
        break
      case 'events':
        const suffix = row.day ? '' : 'time'
        if (row.end) {
          textId = 'interval' + suffix
          values = {start: date, end: row.end}
        } else {
          textId = 'date' + suffix
          values = {date}
        }
        break
      case 'notes':
        textId = 'notes.by'
        values = {author}
        break
    }

    return (
      <Touchable key={row.id || row.uid} style={styles.itemContainer} onPress={this.handlePress.bind(this, type, row)}>
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle} numberOfLines={3}>{row.name}</Text>
          {textId && <FormattedMessage style={styles.itemText} id={textId} values={values} />}
        </View>
        <FormattedRelative value={date} style={styles.itemTime} fallback={dateFallback} />
      </Touchable>
    )
  }

  //TODO: toggables cards

  render() {
    const {type, data} = this.props

    if (!data.length) {
      return null
    }

    const sorter = sorters[type]
    const dateProp = sorter.date
    data.sort((a, b) => {
      if (sorter.sort === 'asc') {
        return a[dateProp] > b[dateProp] ? 1 : -1
      } else {
        return a[dateProp] < b[dateProp] ? 1 : -1
      }
    })

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
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  itemContent: {
    flex: 1, // to wrap
  },
  itemTitle: {
    color: colors.main,
  },
  itemText: {
    color: colors.secondaryText,
  },
  itemTime: {
    fontStyle: 'italic',
    color: colors.secondaryText,
    marginLeft: 16,
  },
})

const mapStateToProps = (state) => ({
  userMap: state.tribe.userMap,
})

export default connect(mapStateToProps)(ActivityCard)
