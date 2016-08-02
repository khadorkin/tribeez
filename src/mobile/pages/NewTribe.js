import React, {Component} from 'react'

import ScrollView from '../hoc/ScrollView'
import TribeForm from '../forms/Tribe'

class NewTribe extends Component {
  render() {
    return (
      <ScrollView>
        <TribeForm type="create" />
      </ScrollView>
    )
  }
}

export default NewTribe
