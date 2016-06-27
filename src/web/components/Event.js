import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {FormattedMessage, FormattedDate, FormattedRelative} from 'react-intl'

import {Card, CardHeader, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import DescIcon from 'material-ui/svg-icons/action/description'
import StartIcon from 'material-ui/svg-icons/action/flight-land'
import EndIcon from 'material-ui/svg-icons/action/flight-takeoff'
import LocationIcon from 'material-ui/svg-icons/maps/place'
import UrlIcon from 'material-ui/svg-icons/content/link'

import gravatar from '../../common/utils/gravatar'

import css from './Entry.css'

const infos = [
  {id: 'description', icon: <DescIcon />},
  {id: 'start', icon: <StartIcon />, date: true},
  {id: 'end', icon: <EndIcon />, date: true},
  {id: 'location', icon: <LocationIcon />, map: true},
  {id: 'url', icon: <UrlIcon />, link: true},
]

class Event extends Component {
  static propTypes = {
    // from parent component:
    event: PropTypes.object.isRequired,
    // from redux:
    uid: PropTypes.number,
    userMap: PropTypes.object.isRequired,
  }

  render() {
    const {event} = this.props

    // to render an event, the users must be loaded for the current tribe events
    const host = this.props.userMap[event.host_id]
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

const mapStateToProps = (state) => ({
  uid: state.member.user.id,
  userMap: state.member.tribe.userMap,
})

export default connect(mapStateToProps)(Event)
