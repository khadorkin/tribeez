import React, {Component} from 'react'
import {ScrollView} from 'react-native'

import TribeForm from '../forms/Tribe'

class NewTribe extends Component {
  render() {
    return (
      <ScrollView keyboardShouldPersistTaps={true}>
        <TribeForm type="create" />
      </ScrollView>
    )
  }
}

export default NewTribe
