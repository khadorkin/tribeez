import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {FormattedMessage, FormattedRelative} from 'react-intl'

import {Card, CardHeader, CardText} from 'material-ui/Card'

import gravatar from '../../common/utils/gravatar'

import css from './Entry.css'

class Entry extends Component {

  render() {
    const {entry, users, uid} = this.props

    // to render an activity, the users must be loaded for the current tribe activity (see parent component)
    const author = users.find((u) => u.id === entry.user_id)
    if (!author) {
      return null
    }

    let infos

    const values = {}
    if (author.id === uid) {
      values.author = '_you_'
    } else {
      values.author = author.name
    }

    switch (entry.item_type) {
      case 'user':
        if (entry.item_id) {
          const inviter = users.find((u) => u.id === entry.item_id)
          if (inviter) {
            infos = <FormattedMessage id={`entry.user.${entry.action}.infos`} values={{inviter: inviter.name}} />
          }
        }
        break
      case 'bill':
        values.name = entry.data.name
        values.amount = entry.data.amount
        const user_part = entry.data.parts.find((part) => part.user_id === uid)
        if (user_part) {
          infos = <FormattedMessage id={`entry.bill.${entry.action}.infos`} values={{amount: user_part.amount}} />
        } else {
          infos = <FormattedMessage id={`entry.bill.${entry.action}.stranger`} />
        }
        break
      case 'poll':
        values.name = entry.data.name
        break
      case 'event':
        values.name = entry.data.name
        values.when = entry.data.start
        break
      case 'task':
        values.name = entry.data.name
        break
      default:
        return null
    }

    if (entry.action === 'comment') {
      infos = <span>{entry.data.text}</span>
    }

    const title = <FormattedMessage id={`entry.${entry.item_type}.${entry.action}`} values={values} />
    const date = <FormattedRelative value={entry.added} />

    if (infos) {
      infos = (
        <CardText>
          {infos}
        </CardText>
      )
    }

    return (
      <Card className={css.container}>
        <CardHeader title={title} subtitle={<span>{date}</span>}
          style={{height: 'auto', whiteSpace: 'nowrap'}}
          textStyle={{whiteSpace: 'normal', paddingRight: '90px'}}
          avatar={gravatar(author)}
        />
        {infos}
      </Card>
    )
  }

}

Entry.propTypes = {
  entry: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  uid: PropTypes.number,
}

const mapStateToProps = (state) => ({
  users: state.member.tribe.users,
  uid: state.member.user.id,
})

export default connect(mapStateToProps)(Entry)
