import React, { Component, PropTypes } from 'react'
import { FormattedMessage, FormattedDate } from 'react-intl'

import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import CardText from 'material-ui/lib/card/card-text'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import EmailIcon from 'material-ui/lib/svg-icons/communication/email'
import PhoneIcon from 'material-ui/lib/svg-icons/communication/call'
import CakeIcon from 'material-ui/lib/svg-icons/social/cake'

import css from './Member.css'

const infos = [
  {id: 'email', icon: <EmailIcon />, href: 'mailto:'},
  {id: 'phone', icon: <PhoneIcon />, href: 'tel:'},
  {id: 'birthdate', icon: <CakeIcon />, date: true},
]

class Member extends Component {

  render() {
    const date = <FormattedMessage id="member_since" values={{date: <FormattedDate value={this.props.user.registered} />}} />

    return (
      <Card className={css.container}>
        <CardHeader title={this.props.user.name}
          subtitle={date}
          avatar={`https://secure.gravatar.com/avatar/${this.props.user.gravatar}?d=retro&s=40`}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true} className={css.details}>
          <List>
            {
              infos.filter(info => this.props.user[info.id]) // remove undefined infos
                   .map(info => {
                     let value = this.props.user[info.id]
                     const href = info.href ? info.href + value : null
                     if (info.date) {
                       value = <FormattedDate value={value} />
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
}

export default Member
