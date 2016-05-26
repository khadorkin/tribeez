import React, {Component} from 'react'

import {Card} from 'material-ui/Card'

import TribeForm from '../forms/Tribe'

class NewTribe extends Component {

  render() {
    return (
      <Card>
        <TribeForm type="create" />
      </Card>
    )
  }

}

export default NewTribe
