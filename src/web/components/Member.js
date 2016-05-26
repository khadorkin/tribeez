import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {FormattedMessage, FormattedDate} from 'react-intl'

import {Card, CardHeader, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import EmailIcon from 'material-ui/svg-icons/communication/email'
import PhoneIcon from 'material-ui/svg-icons/communication/call'
import CakeIcon from 'material-ui/svg-icons/social/cake'
import BalanceIcon from 'material-ui/svg-icons/action/account-balance-wallet'

import gravatar from '../../common/utils/gravatar'

import css from './Member.css'

const infos = [
  {id: 'email', icon: <EmailIcon />, href: 'mailto:'},
  {id: 'phone', icon: <PhoneIcon />, href: 'tel:'},
  {id: 'birthdate', icon: <CakeIcon />, date: true},
  {id: 'balance', icon: <BalanceIcon />, money: true},
]

class Member extends Component {

  render() {
    const {user} = this.props

    const date = <FormattedMessage id="member_since" values={{date: <FormattedDate value={user.registered} />}} />

    return (
      <Card className={css.container}>
        <CardHeader title={user.name}
          subtitle={date}
          avatar={gravatar(user)}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true} className={css.details}>
          <List>
            {
              infos.filter((info) => user[info.id]) // remove undefined infos
                   .map((info) => {
                     let value = user[info.id]
                     const href = info.href ? info.href + value : null
                     if (info.date) {
                       value = <FormattedDate value={value} />
                     }
                     if (info.money) {
                       //value = <FormattedNumber value={value} style="currency" currency={this.props.currency} />
                       value = `${value} ${this.props.currency}` //TODO: https://github.com/callemall/material-ui/issues/3769
                     }
                     return <ListItem key={info.id} leftIcon={info.icon} primaryText={value} disabled={!href} href={href} />
                   })
            }
          </List>
        </CardText>
      </Card>
    )
  }

}

Member.propTypes = {
  user: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  currency: state.member.tribe.currency,
})

export default connect(mapStateToProps)(Member)
