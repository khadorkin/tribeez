import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import AsyncContent from '../hoc/AsyncContent'

import Entry from '../components/Entry'
import Poll from '../components/Poll'
import SpeedDial from '../components/SpeedDial'

import getActivity from '../actions/getActivity'

class Activity extends Component {

  constructor(props) {
    super(props)
    this.handleLoad = this.handleLoad.bind(this)
  }

  handleLoad() {
    if (!this.props.activity.got) {
      this.props.getActivity()
    }
  }

  render() {
    const {activity: {entries, polls, error}} = this.props

    return (
      <AsyncContent onLoad={this.handleLoad} error={error}>
        {
          polls.map((poll) =>
            <Poll poll={poll} key={poll.id} />
          )
        }

        {
          polls.length > 0 && <br />
        }

        {
          entries.map((entry) =>
            <Entry entry={entry} key={entry.id} />
          )
        }

        <SpeedDial />
      </AsyncContent>
    )
  }

}

Activity.propTypes = {
  // redux state:
  activity: PropTypes.object.isRequired,
  // action creators:
  getActivity: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  activity: state.activity,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getActivity,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Activity)
