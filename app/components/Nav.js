import React from 'react'
const PropTypes = React.PropTypes
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage} from 'react-intl'
import {Link} from 'react-router'

import MenuItem from 'material-ui/lib/menus/menu-item'
import Avatar from 'material-ui/lib/avatar'
import IconButton from 'material-ui/lib/icon-button'

import GroupIcon from 'material-ui/lib/svg-icons/social/group'
import CartIcon from 'material-ui/lib/svg-icons/action/shopping-cart'
import EventIcon from 'material-ui/lib/svg-icons/action/event'
import CheckIcon from 'material-ui/lib/svg-icons/action/assignment-turned-in'
import PasteIcon from 'material-ui/lib/svg-icons/content/content-paste'
import PollIcon from 'material-ui/lib/svg-icons/social/poll'

import ExitIcon from 'material-ui/lib/svg-icons/action/exit-to-app'
import PersonIcon from 'material-ui/lib/svg-icons/social/person'
import DropDownIcon from 'material-ui/lib/svg-icons/navigation/arrow-drop-down'
import DropUpIcon from 'material-ui/lib/svg-icons/navigation/arrow-drop-up'
import AddIcon from 'material-ui/lib/svg-icons/content/add'
import StreamIcon from 'material-ui/lib/svg-icons/action/view-stream'
import SettingsIcon from 'material-ui/lib/svg-icons/action/settings'
import * as colors from 'material-ui/lib/styles/colors'

import postLogout from '../actions/postLogout'
import putSwitch from '../actions/putSwitch'
import {toggleTribes} from '../actions/app'

import routes from '../constants/routes'

import gravatar from '../utils/gravatar'

//TODO: choose between CSS and style!

const css = {} // import css from './Nav.css'

const style = {
  container: {
    overflowY: 'auto',
    paddingBottom: '20px',
  },
  default: {
    borderLeft: '5px solid transparent',
  },
  current: {
    borderLeft: '5px solid rgb(31, 188, 210)',
  },
  new: {
    borderLeft: '5px solid transparent',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    //boxShadow: '0 0px 10px #ddd, 0 -15px 15px white',
  },
  profile: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  logout: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  avatar: {
    marginTop: '30px',
  },
  name: {
    marginTop: '15px',
    fontSize: '1.5em',
  },
  tribe: {
    position: 'relative',
    lineHeight: '30px',
  },
  switch: {
    position: 'absolute',
    top: -10,
    right: 0,
  },
}

const menuEntries = [
  {route: routes.ACTIVITY, icon: <StreamIcon />},
  {route: routes.MEMBERS, icon: <GroupIcon />},
  {route: routes.BILLS, icon: <CartIcon />},
  {route: routes.EVENTS, icon: <EventIcon />},
  {route: routes.TASKS, icon: <CheckIcon />},
  {route: routes.NOTES, icon: <PasteIcon />},
  {route: routes.POLLS, icon: <PollIcon />},
]

class Nav extends React.Component {

  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleTribeListToggle = this.handleTribeListToggle.bind(this)
  }

  handleLogout() {
    this.props.postLogout()
  }

  handleTribeListToggle() {
    this.props.toggleTribes(!this.props.menu_tribes)
  }

  selectTribe(id) {
    this.props.putSwitch(id)
  }

  render() {
    const {user} = this.props

    const menuItems = menuEntries.map((entry) =>
      <MenuItem key={entry.route}
        style={this.props.module === entry.route.substr(1) ? style.current : style.default}
        leftIcon={entry.icon}
        containerElement={<Link to={entry.route} />}
      >
        <FormattedMessage id={entry.route.substr(1)} />
      </MenuItem>
    )

    const menuContainer = (
      <div style={{...style.container, height: (this.props.height - 240 /* header=200+20, footer=20 */) + 'px'}}>
        {menuItems}
      </div>
    )

    const tribeItems = user.tribes.map((tribe) =>
      <MenuItem key={tribe.id}
        onTouchTap={this.selectTribe.bind(this, tribe.id)}
        style={tribe.active ? style.current : style.default}
        rightIconButton={tribe.active ? <IconButton containerElement={<Link to={routes.TRIBE} />}><SettingsIcon color={colors.grey600} /></IconButton> : null}
      >
        {tribe.name}
      </MenuItem>
    )

    const tribesContainer = (
      <div>
        <div style={{...style.container, height: (this.props.height - 288 /* header=200+20, footer=48+20 */) + 'px'}}>
          {tribeItems}
        </div>
        <MenuItem key="new"
          style={style.new}
          leftIcon={<AddIcon />}
          containerElement={<Link to={routes.TRIBE_NEW} />}
        >
          New tribe
        </MenuItem>
      </div>
    )

    return (
      <div>
        <div className={css.header}>
          <IconButton style={style.logout} onTouchTap={this.handleLogout}>
            <ExitIcon color="white" />
          </IconButton>
          <IconButton style={style.profile} containerElement={<Link to={routes.PROFILE} />}>
            <PersonIcon color="white" />
          </IconButton>
          <Avatar style={style.avatar} src={gravatar(user, 80)} size={80} />
          <div style={style.name}>{user.name}</div>
          <div style={style.tribe}>
            {this.props.tribe_name}
            <IconButton style={style.switch} onTouchTap={this.handleTribeListToggle}>
              {this.props.menu_tribes ? <DropUpIcon color="white" /> : <DropDownIcon color="white" />}
            </IconButton>
          </div>
        </div>
        {this.props.menu_tribes ? tribesContainer : menuContainer}
      </div>
    )
  }

}

Nav.propTypes = {
  // from parent component:
  module: PropTypes.string.isRequired,
  // from redux store:
  menu_tribes: PropTypes.bool.isRequired,
  height: PropTypes.number.isRequired,
  tribe_name: PropTypes.string,
  user: PropTypes.object,
  // action creators:
  putSwitch: PropTypes.func.isRequired,
  toggleTribes: PropTypes.func.isRequired,
  postLogout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  menu_tribes: state.app.menu_tribes,
  height: state.app.height,
  tribe_name: state.member.tribe.name,
  user: state.member.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  putSwitch,
  toggleTribes,
  postLogout,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
