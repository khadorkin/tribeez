import React, {Component, PropTypes} from 'react'

import {Card} from 'material-ui/Card'

import withHook from '../hoc/withHook'
import TribeForm from '../forms/Tribe'

class Tribe extends Component {
  static propTypes = {
    // from withHook:
    setHook: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Card>
        <TribeForm type="update" setHook={this.props.setHook} />
      </Card>
    )
  }
}

export default withHook(Tribe)
