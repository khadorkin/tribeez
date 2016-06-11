import React, {Component} from 'react'
import {ScrollView} from 'react-native'

import TribeForm from '../forms/Tribe'

class Tribe extends Component {
  render() {
    return (
      <ScrollView>
        <TribeForm type="update" />
      </ScrollView>
    )
  }
}

export default Tribe
