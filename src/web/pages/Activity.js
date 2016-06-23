import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage} from 'react-intl'

import {Tabs, Tab} from 'material-ui/Tabs'

import AsyncContent from '../hoc/AsyncContent'

import Entry from '../components/Entry'
import SpeedDial from '../components/SpeedDial'

import getActivity from '../../common/actions/getActivity'
import getHistory from '../../common/actions/getHistory'

class Activity extends Component {

  componentWillMount() {
    this.props.getActivity()
  }

  render() {
    const {activity, history} = this.props

    return (
      <div>
        <Tabs>
          <Tab label={<FormattedMessage id="tab.activity" />}>
            {
              activity.items.map((item, index) =>
                <div style={{margin: '15px 10px 0', TODO: true}} key={index}>{item.type}</div>
              )
            }
          </Tab>
          <Tab label={<FormattedMessage id="tab.history" />}>
            <AsyncContent fetcher={this.props.getHistory} data={this.props.history}>
              {
                history.items.map((entry) =>
                  <Entry entry={entry} key={entry.id} />
                )
              }
            </AsyncContent>
          </Tab>
        </Tabs>
        <SpeedDial />
      </div>
    )
  }
}

Activity.propTypes = {
  // redux state:
  activity: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  // action creators:
  getActivity: PropTypes.func.isRequired,
  getHistory: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  activity: state.activity,
  history: state.history,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getActivity,
  getHistory,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Activity)
