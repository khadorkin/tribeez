import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage, FormattedRelative, FormattedNumber} from 'react-intl'

import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import CardText from 'material-ui/lib/card/card-text'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Avatar from 'material-ui/lib/avatar'

import Comment from './Comment'

import gravatar from '../utils/gravatar'

import css from './Entry.css'

class Bill extends Component {

  render() {
    const {bill} = this.props

    // to render a bill, the users must be loaded for the current tribe bills
    const user = this.props.users.find((u) => u.id === bill.payer_id)
    if (!user) {
      return null
    }

    const user_part = bill.parts.find((p) => p.user_id = this.props.uid)

    const total = <FormattedNumber value={bill.amount} style="currency" currency={this.props.currency} />
    const amount = <FormattedNumber value={user_part.amount} style="currency" currency={this.props.currency} />
    const mypart = <FormattedMessage id="bill.mypart" values={{amount}} />
    const title = <span>{total} — {bill.name}</span>
    const date = <FormattedRelative value={bill.added} />

    return (
      <Card className={css.container}>
        <CardHeader title={title} subtitle={<span>{date} — {mypart}</span>}
          style={{height: 'auto', whiteSpace: 'nowrap'}}
          textStyle={{whiteSpace: 'normal', paddingRight: '90px'}}
          avatar={gravatar(user)}
          actAsExpander={true} showExpandableButton={true}
        />
        <CardText expandable={true} style={{paddingTop: 0}}>
          {bill.description}
          <List>
            {
              bill.parts.map((part) => {
                const part_user = this.props.users.find((u) => u.id === part.user_id)
                const part_amount = <FormattedNumber value={part.amount} style="currency" currency={this.props.currency} />
                return <ListItem key={part.user_id} leftAvatar={<Avatar src={gravatar(part_user)} />} disabled={true}>{part_amount}</ListItem>
              })
            }
          </List>
        </CardText>
      </Card>
    )
  }

}

Bill.propTypes = {
  bill: PropTypes.object.isRequired,
  uid: PropTypes.number,
  users: PropTypes.array,
  currency: PropTypes.string,
}

const mapStateToProps = (state) => ({
  uid: state.member.user.id,
  users: state.member.tribe.users,
  currency: state.member.tribe.currency,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  //
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Bill)
