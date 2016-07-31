import React, {Component, PropTypes} from 'react'

import ScrollViewWithHeader from '../hoc/ScrollViewWithHeader'
import BillForm from '../forms/Bill'

class Bill extends Component {
  static propTypes = {
    edit: PropTypes.object,
  }

  render() {
    return (
      <ScrollViewWithHeader>
        <BillForm current={this.props.edit} />
      </ScrollViewWithHeader>
    )
  }
}

export default Bill
