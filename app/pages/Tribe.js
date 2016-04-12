import React, {Component} from 'react'

import Card from 'material-ui/lib/card/card'

import TribeForm from '../forms/Tribe'

class Tribe extends Component {

  render() {
    return (
      <Card>
        <TribeForm type="update" />
      </Card>
    )
  }

}

export default Tribe
