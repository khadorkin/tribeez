import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Activity from '../components/Activity'
import SpeedDial from '../components/SpeedDial'

import getActivity from '../actions/getActivity'

class Home extends Component {

  componentWillMount() {
    this.props.getActivity()
  }

  render() {
    return (
      <div>
        {
          this.props.entries.map(entry =>
            <Activity entry={entry} key={entry.id} />
          )
        }
        <SpeedDial />
      </div>
    )
  }

}

Home.propTypes = {
  entries: PropTypes.array,
}

const mapStateToProps = (state) => ({
  entries: state.member.loading ? [] : state.activity.entries, // the entries need the tribe users
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getActivity,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
