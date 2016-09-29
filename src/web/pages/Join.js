import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {Card} from 'material-ui/Card'

import getInvite from '../../common/actions/getInvite'

import JoinForm from '../forms/Join'

import config from '../../common/config'

class Join extends Component {
  static propTypes = {
    // action creators:
    getInvite: PropTypes.func.isRequired,
    // from react-router:
    params: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.getInvite(this.props.params.tribe, this.props.params.token)

    if (/iPhone|iPod/.test(navigator.userAgent)) {
      window.location = config.app_scheme + '://join/' + this.props.params.tribe + '/' + this.props.params.token
    }
  }

  render() {
    return (
      <Card className="main">
        <JoinForm tribe={this.props.params.tribe} token={this.props.params.token} />
      </Card>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getInvite,
}, dispatch)

export default connect(null, mapDispatchToProps)(Join)
