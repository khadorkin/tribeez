import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {connect} from 'react-redux'

import Icon from 'react-native-vector-icons/MaterialIcons'

import FormattedMessage from './FormattedMessage'
import FormattedRelative from './FormattedRelative'

import routes from '../../common/routes'
import colors from '../../common/constants/colors'

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

  renderItem(row) {
    let author
    if (row.author) {
      const authorObj = this.props.userMap[row.author]
      if (!authorObj) { // might not be available when switching tribe
        return null
      }
      author = authorObj.name
    }

    let date = row.added
    let textId = null
    let values = null

    switch (this.props.type) {
      case 'members':
        date = row.joined
        break
      case 'polls':
        textId = 'asked_by'
        values = {author}
        break
      case 'tasks':
        //nothing
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
      case 'notes':
        textId = 'notes.by'
        values = {author}
        break
    }

    return (
      <View key={row.id || row.uid} style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{row.name}</Text>
          {textId && <FormattedMessage style={styles.itemText} id={textId} values={values} />}
        </View>
        <FormattedRelative value={date} style={styles.itemTime} />
      </View>
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
    elevation: 1,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContent: {
    flex: 1, // to wrap
    marginTop: 4,
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
  uid: state.user.uid,
})

export default connect(mapStateToProps)(ActivityCard)
