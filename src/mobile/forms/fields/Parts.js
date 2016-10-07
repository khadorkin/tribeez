import React, {Component, PropTypes} from 'react'
import {View} from 'react-native'

import {connect} from 'react-redux'
import {Field, formValueSelector} from 'redux-form'

import Part from './Part'

class Parts extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    // from redux:
    method: PropTypes.string.isRequired,
  }

  render() {
    const {fields, method} = this.props

    return (
      <View>
        {
          fields.map((name, index) => (
            <Field key={index}
              name={name}
              component={Part}
              method={method}
            />
          ))
        }
      </View>
    )
  }
}

const selector = formValueSelector('bill')

const mapStateToProps = (state) => ({
  method: selector(state, 'method'),
})

export default connect(mapStateToProps)(Parts)
