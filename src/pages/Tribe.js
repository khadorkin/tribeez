import React, {Component} from 'react'

import {Card} from 'material-ui/Card'

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
