import React, {Component, PropTypes} from 'react'
import {View} from 'react-native'

import {Field} from 'redux-form'

import TaskUser from './TaskUser'

class TaskUsers extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
  }

  render() {
    const {fields} = this.props

    return (
      <View>
        {
          fields.map((name, index) => (
            <Field key={index}
              name={name}
              component={TaskUser}
            />
          ))
        }
      </View>
    )
  }
}

export default TaskUsers
