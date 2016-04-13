import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import AsyncContent from '../hoc/AsyncContent'

import Entry from '../components/Entry'
import Event from '../components/Event'
import Poll from '../components/Poll'
import SpeedDial from '../components/SpeedDial'

import getActivity from '../actions/getActivity'

const h3style = {
  margin: '20px 10px 0',
  fontWeight: 300,
}

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
    const {activity: {entries, polls, events, error}} = this.props

    return (
      <AsyncContent onLoad={this.handleLoad} error={error}>
        {
          polls.length > 0 && <h3 style={h3style}>Open polls</h3>
        }

        {
          polls.map((poll) =>
            <Poll poll={poll} key={poll.id} />
          )
        }

        {
          events.length > 0 && <h3 style={h3style}>Upcoming events</h3>
        }

        {
          events.map((event) =>
            <Event event={event} key={event.id} />
          )
        }

        {
          entries.length > 0 && (polls.length > 0 || events.length > 0) && <h3 style={h3style}>Activity</h3>
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
