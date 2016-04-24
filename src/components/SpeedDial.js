import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'
import {Link} from 'react-router'

import FloatingActionButton from 'material-ui/FloatingActionButton'

import AddIcon from 'material-ui/svg-icons/content/add'
import CartIcon from 'material-ui/svg-icons/action/shopping-cart'
import EventIcon from 'material-ui/svg-icons/action/event'
import CheckIcon from 'material-ui/svg-icons/action/assignment-turned-in'
import PasteIcon from 'material-ui/svg-icons/content/content-paste'
import PollIcon from 'material-ui/svg-icons/social/poll'

import routes from '../constants/routes'

import css from './SpeedDial.css'
const color = 'rgb(95,193,178)'

const actions = [
  {icon: <PollIcon />, route: routes.POLLS_NEW},
  {icon: <PasteIcon />, route: routes.NOTES, id: 'notes_new'},
  {icon: <CheckIcon />, route: routes.TASKS_NEW},
  {icon: <EventIcon />, route: routes.EVENTS_NEW},
  {icon: <CartIcon />, route: routes.BILLS_NEW},
]

class SpeedDial extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle() {
    this.setState({
      open: !this.state.open,
    })
  }

  render() {
    const actionButtons = actions.map((action, index) => {
      const linkTo = {pathname: action.route}
      if (action.id) {
        linkTo.state = {do: 'new'}
      }
      const link = <Link to={linkTo} />

      const id = action.id || action.route.substr(1).replace(/\//g, '_')

      const delay = (30 * (this.state.open ? (actions.length - index) : index))

      return (
        <div className={css.action} key={id}>
          <div className={css.tooltip} style={{transitionDelay: delay + 'ms'}}>
            <FormattedMessage id={id} />
          </div>
          <div className={css.button} style={{transitionDelay: delay + 'ms'}}>
            <FloatingActionButton backgroundColor="white" iconStyle={{fill: color}} containerElement={link}>
              {action.icon}
            </FloatingActionButton>
          </div>
        </div>
      )
    })

    return (
      <div className={(this.state.open ? css.opened : css.closed)}>
        <div className={css.cover} style={{height: this.state.open ? this.props.height + 'px' : 0}} onTouchTap={this.handleToggle}></div>
        <div className={css.container}>
          <div className={css.actions} style={{top: this.state.open ? `${actions.length * -76}px` : '100px'}}>
            {actionButtons}
          </div>
          <FloatingActionButton onMouseUp={this.handleToggle} className={css.main} backgroundColor={color}>
            <AddIcon />
          </FloatingActionButton>
        </div>
      </div>
    )
  }

}

SpeedDial.propTypes = {
  // from redux:
  height: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => ({
  height: state.app.height,
})

export default connect(mapStateToProps)(SpeedDial)
