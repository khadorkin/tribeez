import React, {Component, PropTypes} from 'react'

import Card from 'material-ui/lib/card/card'

import BillForm from '../forms/Bill'

class Bill extends Component {

  render() {
    return (
      <Card>
        <BillForm id={this.props.params.id ? Number(this.props.params.id) : null} />
      </Card>
    )
  }

}

Bill.propTypes = {
  // from react-router:
  params: PropTypes.object.isRequired,
}

export default Bill
