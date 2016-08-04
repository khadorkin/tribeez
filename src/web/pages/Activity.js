import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage} from 'react-intl'

import {Tabs, Tab} from 'material-ui/Tabs'
import {red500} from 'material-ui/styles/colors'

import AsyncContent from '../hoc/AsyncContent'

import ActivityCard from '../components/ActivityCard'
import Entry from '../components/Entry'
import SpeedDial from '../components/SpeedDial'

import listenActivity from '../../common/actions/listenActivity'
import {ACTIVITIES} from '../../common/constants/product'

class Activity extends Component {
  static propTypes = {
    // redux state:
    tid: PropTypes.string,
    members: PropTypes.array.isRequired,
    activity: PropTypes.object.isRequired,
    unread: PropTypes.number.isRequired,
    // action creators:
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      tab: 'activity',
    }
    this.load = this.load.bind(this)
    this.handleTabs = this.handleTabs.bind(this)
  }

  componentDidMount() {
    this.load(this.props.tid)
  }

  componentWillReceiveProps(props) {
    this.load(props.tid)
  }

  componentWillUnmount() {
    this.props.unsubscribe()
  }

  load(tid) {
    if (tid && this.tid !== tid) {
      this.tid = tid
      this.props.subscribe(tid)
    }
  }

  handleTabs(tab) {
    this.setState({
      tab,
    })
  }

  renderHistoryEntry(row) {
    return <Entry entry={row} key={row.id} />
  }

  render() {
    const {members, activity, unread} = this.props

    const historyLabel = (
      <span>
        <FormattedMessage id="tab.history" />
        {
          unread > 0 && (
            <span style={styles.badge}>
              {unread}
            </span>
          )
        }
      </span>
    )

    return (
      <div>
        <Tabs onChange={this.handleTabs}>
          <Tab label={<FormattedMessage id="tab.activity" />} value="activity">
            <ActivityCard type="members" data={members} />
            {
              ACTIVITIES.map((type) =>
                <ActivityCard key={type} type={type} data={activity[type]} />
              )
            }
          </Tab>
          <Tab label={historyLabel} value="history">
            {
              // load only if visible, to not get rid of the unread badge:
              this.state.tab === 'history' && (
                <AsyncContent name="history" renderRow={this.renderHistoryEntry} />
              )
            }
          </Tab>
        </Tabs>
        <SpeedDial />
      </div>
    )
  }
}

const styles = {
  badge: {
    color: 'white',
    backgroundColor: red500,
    padding: '3px 5px',
    borderRadius: 5,
    fontSize: '0.8em',
    verticalAlign: 2,
    marginLeft: 10,
  },
}

const mapStateToProps = (state) => ({
  tid: state.tribe.id,
  members: state.tribe.users.filter((user) => user.joined > Date.now() - (7 * 86400 * 1000)), // new members (one week)
  activity: state.activity,
  unread: state.app.unread,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  subscribe: listenActivity.on,
  unsubscribe: listenActivity.off,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Activity)
