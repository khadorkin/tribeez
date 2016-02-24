import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'

import MenuItem from 'material-ui/lib/menus/menu-item'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import CardActions from 'material-ui/lib/card/card-actions'
import FlatButton from 'material-ui/lib/flat-button'
import Avatar from 'material-ui/lib/avatar'
import IconButton from 'material-ui/lib/icon-button'

import HomeIcon from 'material-ui/lib/svg-icons/action/home'
import GroupIcon from 'material-ui/lib/svg-icons/social/group'
import ExitIcon from 'material-ui/lib/svg-icons/action/exit-to-app'
import DropDownIcon from 'material-ui/lib/svg-icons/navigation/arrow-drop-down'
import DropUpIcon from 'material-ui/lib/svg-icons/navigation/arrow-drop-up'

import putSwitch from '../actions/putSwitch'

//TODO: choose between CSS and style!

import css from './Nav.css'

const style = {
  default: {
    borderLeft: '5px solid transparent',
  },
  current: {
    borderLeft: '5px solid rgb(31, 188, 210)',
  },
  logout: {
    borderLeft: '5px solid transparent',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tribe: {
    position: 'relative',
    lineHeight: '30px',
  },
  switch: {
    position: 'absolute',
    top: -11,
    right: 0,
  },
}

class Nav extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showTribes: false,
    }
    this.toggleTribeList = this.toggleTribeList.bind(this)
  }

  toggleTribeList(event) {
    this.setState({
      showTribes: !this.state.showTribes,
    })
  }

  selectTribe(id) {
    this.props.putSwitch(id)
    this.setState({
      showTribes: false,
    })
  }

  render() {
    const menuEntries = [
      {id: 'home', icon: <HomeIcon />},
      {id: 'members', icon: <GroupIcon />},
    ]

    const menuItems = menuEntries.map(entry =>
      <MenuItem key={entry.id}
                style={this.props.page === entry.id ? style.current : style.default}
                leftIcon={entry.icon}
                containerElement={<Link to={'/' + entry.id} />}><FormattedMessage id={entry.id} /></MenuItem>
    )

    const tribeItems = this.props.tribes.map(tribe =>
      <MenuItem key={tribe.id}
                onTouchTap={this.selectTribe.bind(this, tribe.id)}
                style={tribe.active ? style.current : style.default}>{tribe.name}</MenuItem>
    )

    return (
      <div>
        <div className={css.header}>
          <Avatar src={'https://secure.gravatar.com/avatar/' + this.props.gravatar + '?d=retro&s=80'} size={80} />
          <div className={css.name}>{this.props.name}</div>
          <div style={style.tribe}>
            {this.props.tribe}
            <IconButton style={style.switch} onTouchTap={this.toggleTribeList}>
              {this.state.showTribes ? <DropUpIcon color="white" /> : <DropDownIcon color="white" />}
            </IconButton>
          </div>
        </div>
        {this.state.showTribes ? tribeItems : menuItems}
        <MenuItem style={style.logout} leftIcon={<ExitIcon />} containerElement={<Link to="/logout" />}>Logout</MenuItem>
      </div>
    )
  }

}

Nav.propTypes = {
  page: PropTypes.string.isRequired,
  tribe: PropTypes.string,
  name: PropTypes.string,
  gravatar: PropTypes.string,
}

const mapStateToProps = (state) => ({
  page: state.routing.location.pathname.split('/')[1],
  tribe: state.member.tribe.name,
  name: state.member.user.name,
  tribes: state.member.user.tribes,
  gravatar: state.member.user.gravatar,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  putSwitch,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
