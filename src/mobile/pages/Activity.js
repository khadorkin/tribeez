import React, {Component, PropTypes} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import AsyncContent from '../hoc/AsyncContent'
import Entry from '../components/Entry'

import getActivity from '../../common/actions/getActivity'

class Activity extends Component {
  static propTypes = {
    // from redux:
    activity: PropTypes.object,
    // action creators:
    getActivity: PropTypes.func.isRequired,
  }

  render() {
    return (
      <AsyncContent
        data={this.props.activity}
        fetcher={this.props.getActivity}
        rowComponent={Entry}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  activity: state.activity,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getActivity,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Activity)
