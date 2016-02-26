import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Activity from '../components/Activity'
import SpeedDial from '../components/SpeedDial'
import Error from '../components/Error'

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

        {
          this.props.error && <Error message={this.props.error} retry={this.props.getActivity} />
        }
        <SpeedDial />
      </div>
    )
  }

}

Home.propTypes = {
  entries: PropTypes.array,
  error: PropTypes.string,
}

const mapStateToProps = (state) => ({
  entries: state.member.loading ? [] : state.activity.entries, // the entries need the tribe users
  error: state.activity.error,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getActivity,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
