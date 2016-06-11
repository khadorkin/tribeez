import React, {Component, PropTypes} from 'react'
import {ScrollView} from 'react-native'

import BillForm from '../forms/Bill'

class Bill extends Component {
  static propTypes = {
    edit: PropTypes.object,
  }

  render() {
    return (
      <ScrollView>
        <BillForm current={this.props.edit} />
      </ScrollView>
    )
  }
}

export default Bill
