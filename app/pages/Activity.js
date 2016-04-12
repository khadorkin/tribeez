import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import AsyncContent from '../hoc/AsyncContent'

import Entry from '../components/Entry'
import Poll from '../components/Poll'
import SpeedDial from '../components/SpeedDial'

import getActivity from '../actions/getActivity'
import getPolls from '../actions/getPolls'

class Activity extends Component {

  constructor(props) {
    super(props)
    this.handlePollsLoad = this.handlePollsLoad.bind(this)
    this.handleActivityLoad = this.handleActivityLoad.bind(this)
  }

  handlePollsLoad() {
    if (!this.props.polls.got) {
      this.props.getPolls()
    }
  }

  handleActivityLoad() {
    if (!this.props.activity.got) {
      this.props.getActivity()
    }
  }

  render() {
    const {activity, polls} = this.props

    return (
      <div>
        <AsyncContent onLoad={this.handlePollsLoad} error={activity.error}>
          {
            polls.list
              .filter((poll) => poll.active)
              .map((poll) =>
                <Poll poll={poll} key={poll.id} />
              )
          }

          <SpeedDial />
        </AsyncContent>

        {
          polls.list.length ? <br /> : ''
        }

        <AsyncContent onLoad={this.handleActivityLoad} error={activity.error}>
          {
            activity.entries.map((entry) =>
              <Entry entry={entry} key={entry.id} />
            )
          }

          <SpeedDial />
        </AsyncContent>
      </div>
    )
  }

}

Activity.propTypes = {
  // redux state:
  activity: PropTypes.object.isRequired,
  polls: PropTypes.object.isRequired,
  // action creators:
  getActivity: PropTypes.func.isRequired,
  getPolls: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  activity: state.activity,
  polls: state.polls,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getActivity,
  getPolls,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Activity)
