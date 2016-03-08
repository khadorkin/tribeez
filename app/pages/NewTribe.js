import React, {Component, PropTypes} from 'react'

import Card from 'material-ui/lib/card/card'

import TribeForm from '../forms/Tribe'

class NewTribe extends Component {

  render() {
    return (
      <Card>
        <TribeForm />
      </Card>
    )
  }

}

export default NewTribe
