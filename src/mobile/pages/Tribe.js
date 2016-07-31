import React, {Component} from 'react'

import ScrollViewWithHeader from '../hoc/ScrollViewWithHeader'
import TribeForm from '../forms/Tribe'

class Tribe extends Component {
  render() {
    return (
      <ScrollViewWithHeader>
        <TribeForm type="update" />
      </ScrollViewWithHeader>
    )
  }
}

export default Tribe
