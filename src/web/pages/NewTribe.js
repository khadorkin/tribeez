import React, {Component, PropTypes} from 'react'

import {Card} from 'material-ui/Card'

import withHook from '../hoc/withHook'
import TribeForm from '../forms/Tribe'

class NewTribe extends Component {

  render() {
    return (
      <Card>
        <TribeForm type="create" setHook={this.props.setHook} />
      </Card>
    )
  }

}

NewTribe.propTypes = {
  // from withHook:
  setHook: PropTypes.func.isRequired,
}

export default withHook(NewTribe)
