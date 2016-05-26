import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {Card} from 'material-ui/Card'

import getReset from '../../common/actions/getReset'

import ResetForm from '../forms/Reset'

class Reset extends Component {

  componentWillMount() {
    this.props.getReset(this.props.params.token)
  }

  render() {
    return (
      <Card className="main">
        <ResetForm token={this.props.params.token} />
      </Card>
    )
  }

}

Reset.propTypes = {
  // action creators:
  getReset: PropTypes.func.isRequired,
  // from react-router:
  params: PropTypes.object.isRequired,
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getReset,
}, dispatch)

export default connect(null, mapDispatchToProps)(Reset)
