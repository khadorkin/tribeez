import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import colors from 'material-ui/lib/styles/colors'
import FloatingActionButton from 'material-ui/lib/floating-action-button'

import AddIcon from 'material-ui/lib/svg-icons/content/add'
import EventIcon from 'material-ui/lib/svg-icons/action/event'
import CartIcon from 'material-ui/lib/svg-icons/action/shopping-cart'
import CheckIcon from 'material-ui/lib/svg-icons/action/assignment-turned-in'
import NoteIcon from 'material-ui/lib/svg-icons/action/description'

import css from './SpeedDial.css'
const color = 'rgb(95,193,178)'

const actions = [
  {id: 'expense', icon: <CartIcon color={color} />},
  {id: 'event', icon: <EventIcon color={color} />},
  {id: 'task', icon: <CheckIcon color={color} />},
  {id: 'note', icon: <NoteIcon color={color} />},
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
      const delay = (30 * (this.state.open ? (actions.length - index) : index))
      return (
        <div className={css.action} key={action.id}>
          <div className={css.tooltip} style={{transitionDelay: delay + 'ms'}}>
            <FormattedMessage id={'new_' + action.id} />
          </div>
          <div className={css.button} style={{transitionDelay: delay + 'ms'}}>
            <FloatingActionButton backgroundColor="white">
              {action.icon}
            </FloatingActionButton>
          </div>
        </div>
      )
    })

    return (
      <div className={this.state.open ? css.opened : css.closed}>
        <div className={css.cover} onClick={this.toggle}></div>
        <div className={css.container}>
          <div className={css.actions}>
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

SpeedDial.propTypes = {
  open: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  open: true,
})

export default connect(mapStateToProps)(SpeedDial)
