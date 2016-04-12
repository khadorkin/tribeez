import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {FormattedMessage, FormattedRelative, FormattedNumber} from 'react-intl'

import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import CardText from 'material-ui/lib/card/card-text'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Avatar from 'material-ui/lib/avatar'
import CardActions from 'material-ui/lib/card/card-actions'
import IconButton from 'material-ui/lib/icon-button'
import EditButton from 'material-ui/lib/svg-icons/image/edit'
import DeleteButton from 'material-ui/lib/svg-icons/action/delete'
import * as colors from 'material-ui/lib/styles/colors'

import Entry from '../components/Entry'

import gravatar from '../utils/gravatar'

import routes from '../constants/routes'

import css from './Entry.css'

class Bill extends Component {

  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete() {
    this.props.onDelete(this.props.bill)
  }

  render() {
    const {bill} = this.props

    // to render a bill, the users must be loaded for the current tribe bills
    const user = this.props.users.find((u) => u.id === bill.payer_id)
    if (!user) {
      return null
    }

    const user_part = bill.parts.find((p) => p.user_id === this.props.uid)

    const total = <FormattedNumber value={bill.amount} style="currency" currency={this.props.currency} />

    let formatted_part
    if (user_part) {
      const amount = <FormattedNumber value={user_part.amount} style="currency" currency={this.props.currency} />
      formatted_part = <FormattedMessage id="bill.mypart" values={{amount}} />
    } else {
      formatted_part = <FormattedMessage id="bill.nopart" />
    }
    const title = <span>{total} — {bill.name}</span>
    const date = <FormattedRelative value={bill.added} />

    return (
      <Card className={css.container}>
        <CardHeader title={title} subtitle={<span>{date} — {formatted_part}</span>}
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

                return (
                  <ListItem key={part.user_id} leftAvatar={<Avatar src={gravatar(part_user)} />} disabled={true}>
                    {part_amount}
                  </ListItem>
                )
              })
            }
          </List>
        </CardText>
        <CardActions expandable={true} style={{textAlign: 'right', marginTop: '-50px'}}>
          <IconButton containerElement={<Link to={{pathname: routes.BILLS_EDIT.replace(':id', bill.id), state: bill}} />}>
            <EditButton color={colors.grey600} />
          </IconButton>
          <IconButton onTouchTap={this.handleDelete}>
            <DeleteButton color={colors.red400} />
          </IconButton>
        </CardActions>
        <CardText expandable={true}>
          {
            bill.entries && bill.entries.map((entry) =>
              <Entry entry={entry} key={entry.id} />
            )
          }
        </CardText>
      </Card>
    )
  }

}

Bill.propTypes = {
  // from parent component:
  bill: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  // from redux state:
  uid: PropTypes.number,
  users: PropTypes.array,
  currency: PropTypes.string,
}

const mapStateToProps = (state) => ({
  uid: state.member.user.id,
  users: state.member.tribe.users,
  currency: state.member.tribe.currency,
})

export default connect(mapStateToProps)(Bill)
