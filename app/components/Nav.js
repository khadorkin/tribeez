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

import HomeIcon from 'material-ui/lib/svg-icons/action/home'
import GroupIcon from 'material-ui/lib/svg-icons/social/group'
import ExitIcon from 'material-ui/lib/svg-icons/action/exit-to-app'

import getLogout from '../actions/getLogout'

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
}

class Nav extends Component {

  render() {
    return (
      <div>
        <div className={css.header}>
          <Avatar src={'https://secure.gravatar.com/avatar/' + this.props.gravatar + '?d=retro&s=80'} size={80} />
          <div className={css.name}>{this.props.name}</div>
          <div>{this.props.tribe}</div>
        </div>
        <MenuItem style={this.props.page === 'home' ? style.current : style.default} leftIcon={<HomeIcon />} containerElement={<Link to="/home" />}>Home</MenuItem>
        <MenuItem style={this.props.page === 'members' ? style.current : style.default} leftIcon={<GroupIcon />} containerElement={<Link to="/members" />}>Members</MenuItem>
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
  tribe: state.user.tribe.name,
  name: state.user.data.name,
  gravatar: state.user.data.gravatar,
})

export default connect(mapStateToProps)(Nav)
