import React, {Component} from 'react'

import ScrollViewWithHeader from '../hoc/ScrollViewWithHeader'
import TribeForm from '../forms/Tribe'

class NewTribe extends Component {
  render() {
    return (
      <ScrollViewWithHeader>
        <TribeForm type="create" />
      </ScrollViewWithHeader>
    )
  }
}

export default NewTribe
