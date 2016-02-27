import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'

import FloatingActionButton from 'material-ui/lib/floating-action-button'

import AddIcon from 'material-ui/lib/svg-icons/content/add'
import CartIcon from 'material-ui/lib/svg-icons/action/shopping-cart'
import EventIcon from 'material-ui/lib/svg-icons/action/event'
import CheckIcon from 'material-ui/lib/svg-icons/action/assignment-turned-in'
import PasteIcon from 'material-ui/lib/svg-icons/content/content-paste'
import PollIcon from 'material-ui/lib/svg-icons/social/poll'

import routes from '../constants/routes'

import css from './SpeedDial.css'
const color = 'rgb(95,193,178)'

const actions = [
  {route: routes.POLLS_NEW, icon: <PollIcon color={color} />},
  {route: routes.NOTES_NEW, icon: <PasteIcon color={color} />},
  {route: routes.TASKS_NEW, icon: <CheckIcon color={color} />},
  {route: routes.EVENTS_NEW, icon: <EventIcon color={color} />},
  {route: routes.BILLS_NEW, icon: <CartIcon color={color} />},
]

class SpeedDial extends Component {

  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      open: false,
    }
  }

  toggle() {
    this.setState({
      open: !this.state.open,
    })
  }

  render() {
    const actionButtons = actions.map((action, index) => {
      const id = action.route.substr(1).replace(/\//g, '_')
      const delay = (30 * (this.state.open ? (actions.length - index) : index))
      const link = <Link to={action.route} />
      return (
        <div className={css.action} key={id}>
          <div className={css.tooltip} style={{transitionDelay: delay + 'ms'}}>
            <FormattedMessage id={id} />
          </div>
          <div className={css.button} style={{transitionDelay: delay + 'ms'}}>
            <FloatingActionButton backgroundColor="white" containerElement={link}>
              {action.icon}
            </FloatingActionButton>
          </div>
        </div>
      )
    })

    return (
      <div className={(this.state.open ? css.opened : css.closed)}>
        <div className={css.cover} style={{height: this.state.open ? this.props.height + 'px' : 0}} onTouchTap={this.toggle}></div>
        <div className={css.container}>
          <div className={css.actions} style={{top: this.state.open ? (actions.length * -76) + 'px' : '100px'}}>
            {actionButtons}
          </div>
          <FloatingActionButton onMouseUp={this.toggle} className={css.main} backgroundColor={color}>
            <AddIcon />
          </FloatingActionButton>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  height: state.app.height,
})

export default connect(mapStateToProps)(SpeedDial)
