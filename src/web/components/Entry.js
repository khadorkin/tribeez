import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {FormattedMessage, FormattedRelative} from 'react-intl'

import {Card, CardHeader, CardText} from 'material-ui/Card'

import gravatar from '../../common/utils/gravatar'
import {getTimestamp} from '../../common/utils/time'

class Entry extends Component {
  static propTypes = {
    entry: PropTypes.object.isRequired,
    userMap: PropTypes.object.isRequired,
    uid: PropTypes.string,
  }

  render() {
    const {entry, userMap, uid} = this.props

    // to render an activity, the users must be loaded for the current tribe activity (see parent component)
    const author = userMap[entry.author]
    if (!author) {
      return null
    }

    const values = {}
    if (author.uid === uid) {
      values.author = '_you_'
    } else {
      values.author = author.name
    }
    if (entry.item) {
      values.name = entry.item.name
    }

    let infos

    if (entry.action === 'comment') {
      infos = <span>{entry.item.text}</span>
    } else {
      switch (entry.type) {
        case 'member':
          if (entry.inviter) {
            const inviter = userMap[entry.inviter]
            if (inviter) {
              infos = <FormattedMessage id={`entry.member.${entry.action}.infos`} values={{inviter: inviter.name}} />
            }
          }
          break
        case 'bill':
          values.amount = entry.item.amount
          const amount = entry.item.parts[uid]
          if (amount) {
            infos = <FormattedMessage id={`entry.bill.${entry.action}.infos`} values={{amount}} />
          } else {
            infos = <FormattedMessage id={`entry.bill.${entry.action}.stranger`} />
          }
          break
        case 'event':
          values.when = getTimestamp(entry.item.start)
          break
      }
    }

    const title = <FormattedMessage id={`entry.${entry.type}.${entry.action}`} values={values} />
    const date = <FormattedRelative value={entry.time} />

    if (infos) {
      infos = (
        <CardText>
          {infos}
        </CardText>
      )
    }

    const style = {...styles.container}
    if (entry.new) {
      style.backgroundColor = '#FFFFDD'
    }

    return (
      <Card style={style}>
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

const styles = {
  container: {
    margin: '15px 10px 0',
  },
}

const mapStateToProps = (state) => ({
  userMap: state.tribe.userMap,
  uid: state.user.uid,
})

export default connect(mapStateToProps)(Entry)
