import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage} from 'react-intl'

import AsyncContent from '../hoc/AsyncContent'

import Entry from '../components/Entry'
import Event from '../components/Event'
import Poll from '../components/Poll'
import Task from '../components/Task'
import SpeedDial from '../components/SpeedDial'

import getActivity from '../../common/actions/getActivity'

const h3style = {
  margin: '20px 10px 0',
  fontWeight: 300,
}

class Activity extends Component {

  render() {
    const {activity: {items, polls, events, tasks}} = this.props

    return (
      <AsyncContent fetcher={this.props.getActivity} data={this.props.activity}>
        {
          tasks.length > 0 && <h3 style={h3style}><FormattedMessage id="tasks_todo" /></h3>
        }

        {
          tasks.map((task) =>
            <Task task={task} key={task.id} />
          )
        }

        {
          polls.length > 0 && <h3 style={h3style}><FormattedMessage id="open_polls" /></h3>
        }

        {
          polls.map((poll) =>
            <Poll poll={poll} key={poll.id} />
          )
        }

        {
          events.length > 0 && <h3 style={h3style}><FormattedMessage id="upcoming_events" /></h3>
        }

        {
          events.map((event) =>
            <Event event={event} key={event.id} />
          )
        }

        {
          items.length > 0 && (polls.length > 0 || events.length > 0 || tasks.length > 0) && <h3 style={h3style}><FormattedMessage id="activity" /></h3>
        }

        {
          items.map((entry) =>
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
