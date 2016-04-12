import React from 'react'
const PropTypes = React.PropTypes

import Card from 'material-ui/lib/card/card'

import TribeForm from '../forms/Tribe'

class NewTribe extends React.Component {

  render() {
    return (
      <Card>
        <TribeForm type="create" />
      </Card>
    )
  }

}

export default NewTribe
