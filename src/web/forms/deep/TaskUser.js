import React, {Component, PropTypes} from 'react'

import Checkbox from 'material-ui/Checkbox'

import styles from '../../styles'

class TaskUser extends Component {
  static propTypes = {
    // from parent form:
    user: PropTypes.object,
    checked: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleCheck = this.handleCheck.bind(this)
  }

  handleCheck(event, checked) {
    this.props.checked.onChange(checked)
  }

  render() {
    const {user, checked} = this.props

    if (!user) {
      return null // in cases users are not loaded yet
    }

    return (
      <Checkbox label={user.name} checked={checked.value} onCheck={this.handleCheck} style={styles.field} />
    )
  }
}

export default TaskUser
