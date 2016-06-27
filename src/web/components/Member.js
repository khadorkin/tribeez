import React, {Component, PropTypes} from 'react'
import {FormattedMessage, FormattedDate} from 'react-intl'

import {Card, CardHeader, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import EmailIcon from 'material-ui/svg-icons/communication/email'
import PhoneIcon from 'material-ui/svg-icons/communication/call'
import CakeIcon from 'material-ui/svg-icons/social/cake'

import gravatar from '../../common/utils/gravatar'

const infos = [
  {id: 'email', icon: <EmailIcon />, href: 'mailto:'},
  {id: 'phone', icon: <PhoneIcon />, href: 'tel:'},
  {id: 'birthdate', icon: <CakeIcon />, date: true},
]

class Member extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  render() {
    const {user} = this.props

    const date = <FormattedMessage id="member_since" values={{when: user.registered}} />

    return (
      <Card style={styles.container}>
        <CardHeader title={user.name}
          subtitle={date}
          avatar={gravatar(user)}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true} style={styles.details}>
          <List>
            {
              infos
              .filter((info) => user[info.id]) // remove undefined infos
              .map((info) => {
                let value = user[info.id]
                const href = (info.href ? (info.href + value) : null)
                if (info.date) {
                  value = <FormattedDate value={value} />
                }
                return (
                  <ListItem
                    key={info.id}
                    leftIcon={info.icon}
                    primaryText={value}
                    disabled={!href}
                    href={href}
                  />
                )
              })
            }
          </List>
        </CardText>
      </Card>
    )
  }
}

const styles = {
  container: {
    margin: '15px 10px 0',
  },
  details: {
    paddingTop: 0,
  },
}

export default Member
