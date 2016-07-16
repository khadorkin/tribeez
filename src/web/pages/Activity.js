import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'

import {Tabs, Tab} from 'material-ui/Tabs'
import {red500} from 'material-ui/styles/colors'

import AsyncContent from '../hoc/AsyncContent'

import Entry from '../components/Entry'
import SpeedDial from '../components/SpeedDial'

class Activity extends Component {
  static propTypes = {
    // redux state:
    unread: PropTypes.number,
  }

  constructor(props) {
    super(props)
    this.state = {
      tab: 'activity',
    }
    this.handleTabs = this.handleTabs.bind(this)
  }

  handleTabs(tab) {
    this.setState({
      tab,
    })
  }

  renderActivity(row) {
    return <div style={{margin: '15px 10px 0', TODO: true}} key={row.id}>{JSON.stringify(row)}</div>
  }

  renderHistoryEntry(row) {
    return <Entry entry={row} key={row.id} />
  }

  render() {
    const {unread} = this.props

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
            <AsyncContent name="activity" renderRow={this.renderActivity} />
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
  unread: state.app.unread,
})

export default connect(mapStateToProps)(Activity)
