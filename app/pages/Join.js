import React from 'react'
const PropTypes = React.PropTypes
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Card from 'material-ui/lib/card/card'

import getInvite from '../actions/getInvite'

import JoinForm from '../forms/Join'

class Join extends React.Component {

  componentWillMount() {
    this.props.getInvite(this.props.params.token)
  }

  render() {
    return (
      <Card className="main">
        <JoinForm token={this.props.params.token} />
      </Card>
    )
  }

}

Join.propTypes = {
  // action creators:
  getInvite: PropTypes.func.isRequired,
  // from react-router:
  params: PropTypes.object.isRequired,
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getInvite,
}, dispatch)

export default connect(null, mapDispatchToProps)(Join)
