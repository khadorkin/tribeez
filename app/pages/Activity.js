import React from 'react'
const PropTypes = React.PropTypes
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import AsyncContent from '../hoc/AsyncContent'

import Entry from '../components/Entry'
import SpeedDial from '../components/SpeedDial'

import getActivity from '../actions/getActivity'

class Activity extends React.Component {

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
    const {activity} = this.props

    return (
      <AsyncContent onLoad={this.handleLoad} error={activity.error}>
        {
          activity.entries.map((entry) =>
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
