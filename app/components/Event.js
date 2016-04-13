import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {FormattedMessage, FormattedDate, FormattedRelative} from 'react-intl'

import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import CardText from 'material-ui/lib/card/card-text'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import DescIcon from 'material-ui/lib/svg-icons/action/description'
import StartIcon from 'material-ui/lib/svg-icons/action/flight-land'
import EndIcon from 'material-ui/lib/svg-icons/action/flight-takeoff'
import LocationIcon from 'material-ui/lib/svg-icons/maps/place'
import UrlIcon from 'material-ui/lib/svg-icons/content/link'

import gravatar from '../utils/gravatar'

import css from './Entry.css'

const infos = [
  {id: 'description', icon: <DescIcon />},
  {id: 'start', icon: <StartIcon />, date: true},
  {id: 'end', icon: <EndIcon />, date: true},
  {id: 'location', icon: <LocationIcon />, map: true},
  {id: 'url', icon: <UrlIcon />, link: true},
]

class Event extends Component {

  render() {
    const {event} = this.props

    // to render an event, the users must be loaded for the current tribe events
    const host = this.props.users.find((u) => u.id === event.host_id)
    if (!host) {
      return null
    }

    const subtitle = <FormattedRelative value={event.start} />

    return (
      <Card className={css.container}>
        <CardHeader title={event.name} subtitle={<span>{subtitle}</span>}
          style={{height: 'auto', whiteSpace: 'nowrap'}}
          textStyle={{whiteSpace: 'normal', paddingRight: '90px'}}
          avatar={gravatar(host)}
          actAsExpander={true} showExpandableButton={true}
        />
        <CardText expandable={true} style={{paddingTop: 8}}>
          <List>
            {
              infos.filter((info) => event[info.id]) // remove undefined infos
                   .map((info) => {
                     let value = event[info.id]
                     if (info.date) {
                       const date = new Date(value)
                       if (date.getHours() !== 0 || date.getMinutes() !== 0) {
                         value = <FormattedMessage id="datetime" values={{date}} />
                       } else {
                         value = <FormattedDate value={date} day="numeric" month="long" />
                       }
                     }
                     let href = null
                     if (info.link) {
                       href = value
                       value = value.replace(/^(https?:\/\/|)(www\.|)/, '')
                     }
                     if (info.map) {
                       href = 'https://www.google.com/maps?q=' + encodeURIComponent(value)
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

Event.propTypes = {
  // from parent component:
  event: PropTypes.object.isRequired,
  // from redux state:
  uid: PropTypes.number,
  users: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  uid: state.member.user.id,
  users: state.member.tribe.users,
})

export default connect(mapStateToProps)(Event)
