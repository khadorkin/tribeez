import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {FormattedMessage, FormattedRelative} from 'react-intl'

import {Card, CardHeader, CardText} from 'material-ui/Card'

import GroupIcon from 'material-ui/svg-icons/social/group'
import CartIcon from 'material-ui/svg-icons/action/shopping-cart'
import EventIcon from 'material-ui/svg-icons/action/event'
import CheckIcon from 'material-ui/svg-icons/action/assignment-turned-in'
import PasteIcon from 'material-ui/svg-icons/content/content-paste'
import PollIcon from 'material-ui/svg-icons/social/poll'

import colors from '../../common/constants/colors'
import {getTimestamp} from '../../common/utils/utils'

const icons = {
  members: <GroupIcon />,
  bills: <CartIcon />,
  events: <EventIcon />,
  tasks: <CheckIcon />,
  notes: <PasteIcon />,
  polls: <PollIcon />,
}

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

    let textId
    let values
    let date

    switch (this.props.type) {
      case 'members':
        date = row.joined
        break
      case 'polls':
        date = row.added
        textId = 'asked_by'
        values = {author}
        break
      case 'tasks':
        date = row.done
        break
      case 'bills':
        date = row.added
        if (row.part) {
          textId = 'bill.mypart'
          values = {amount: row.part}
        } else {
          textId = 'bill.nopart'
        }
        break
      case 'events':
        date = getTimestamp(row.start)
        const suffix = (typeof row.start === 'string') ? '' : 'time'
        if (row.end) {
          textId = 'interval' + suffix
          values = {start: date, end: getTimestamp(row.end)}
        } else {
          textId = 'date' + suffix
          values = {date}
        }
        break
      case 'notes':
        date = row.updated
        textId = 'notes.by'
        values = {author}
        break
    }

    return (
      <CardText key={row.id || row.uid} style={styles.itemContainer}>
        <div style={styles.itemTitle}>{row.name}</div>
        {
          textId && (
            <div style={styles.itemText}>
              <FormattedMessage id={textId} values={values} />
            </div>
          )
        }
        {
          date && (
            <div style={styles.itemTime}>
              <FormattedRelative value={date} />
            </div>
          )
        }
      </CardText>
    )
  }

  //TODO: toggables cards

  render() {
    const {type, data} = this.props

    if (!data.length) {
      return null
    }

    return (
      <Card style={styles.container}>
        <CardHeader
          title={<FormattedMessage id={'activity.' + type} values={{num: data.length}} />}
          avatar={icons[type]}
        />
        {
          data.map(this.renderItem)
        }
      </Card>
    )
  }
}

const styles = {
  container: {
    margin: '15px 15px 0',
    padding: '5px 15px',
  },
  itemContainer: {
    position: 'relative',
  },
  itemTitle: {
    //TODO
  },
  itemText: {
    color: colors.secondaryText,
  },
  itemTime: {
    position: 'absolute',
    right: 16,
    top: 16,
    fontStyle: 'italic',
    color: colors.secondaryText,
  },
}

const mapStateToProps = (state) => ({
  userMap: state.tribe.userMap,
  uid: state.user.uid,
})

export default connect(mapStateToProps)(ActivityCard)
