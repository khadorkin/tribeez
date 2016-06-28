import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage} from 'react-intl'

import {Tabs, Tab} from 'material-ui/Tabs'
import {red500} from 'material-ui/styles/colors'

import AsyncContent from '../hoc/AsyncContent'

import Entry from '../components/Entry'
import SpeedDial from '../components/SpeedDial'

import getActivity from '../../common/actions/getActivity'
import getHistory from '../../common/actions/getHistory'

class Activity extends Component {
  static propTypes = {
    // redux state:
    activity: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    unread: PropTypes.number,
    // action creators:
    getActivity: PropTypes.func.isRequired,
    getHistory: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      tab: 'activity',
    }
    this.handleTabs = this.handleTabs.bind(this)
  }

  componentDidMount() {
    this.props.getActivity(this.props.history.last_id)
  }

  handleTabs(tab) {
    this.setState({
      tab,
    })
  }

  render() {
    const {activity, history, unread} = this.props

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
            {
              activity.items.map((item, index) =>
                <div style={{margin: '15px 10px 0', TODO: true}} key={index}>{item.type}</div>
              )
            }
          </Tab>
          <Tab label={historyLabel} value="history">
            {
              // lazy load:
              this.state.tab === 'history' && (
                <AsyncContent fetcher={this.props.getHistory} data={this.props.history}>
                  {
                    history.items.map((entry) =>
                      <Entry entry={entry} key={entry.id} />
                    )
                  }
                </AsyncContent>
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
  activity: state.activity,
  history: state.history,
  unread: state.member.user.unread,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getActivity,
  getHistory,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Activity)
