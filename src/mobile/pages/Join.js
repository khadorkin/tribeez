import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import ScrollView from '../hoc/ScrollView'
import JoinForm from '../forms/Join'

import getInvite from '../../common/actions/getInvite'

class Join extends Component {
  static propTypes = {
    // from parent:
    tribe: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    // action creators:
    getInvite: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getInvite(this.props.tribe, this.props.token)
  }

  render() {
    return (
      <ScrollView>
        <JoinForm tribe={this.props.tribe} token={this.props.token} />
      </ScrollView>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getInvite,
}, dispatch)

export default connect(null, mapDispatchToProps)(Join)
