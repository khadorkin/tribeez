import React, {Component, PropTypes} from 'react'
import {ScrollView} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import JoinForm from '../forms/Join'

import getInvite from '../../common/actions/getInvite'

class Join extends Component {
  static propTypes = {
    // from parent:
    item: PropTypes.string.isRequired,
    // action creators:
    getInvite: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.getInvite(this.props.item)
  }

  render() {
    return (
      <ScrollView>
        <JoinForm token={this.props.item} />
      </ScrollView>
    )
  }

}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getInvite,
}, dispatch)

export default connect(null, mapDispatchToProps)(Join)
