import React, {Component, PropTypes} from 'react'

import Card from 'material-ui/lib/card/card'

import BillForm from '../forms/Bill'

class NewBill extends Component {

  render() {
    return (
      <Card>
        <BillForm />
      </Card>
    )
  }

}

export default NewBill
