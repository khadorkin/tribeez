import React from 'react'
const PropTypes = React.PropTypes

import Card from 'material-ui/lib/card/card'

import TribeForm from '../forms/Tribe'

class Tribe extends React.Component {

  render() {
    return (
      <Card>
        <TribeForm type="update" />
      </Card>
    )
  }

}

export default Tribe
