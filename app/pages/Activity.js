import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Entry from '../components/Entry'
import SpeedDial from '../components/SpeedDial'
import Error from '../components/Error'

import getActivity from '../actions/getActivity'

class Activity extends Component {

  constructor(props) {
    super(props)
    this.handleRetry = this.handleRetry.bind(this)
  }

  componentWillMount() {
    if (!this.props.activity.got) {
      this.props.getActivity()
    }
  }

  handleRetry() {
    this.props.getActivity()
  }

  render() {
    const {activity} = this.props

    return (
      <div>
        {
          activity.entries.map((entry) =>
            <Entry entry={entry} key={entry.id} />
          )
        }

        {
          activity.error && <Error message={activity.error} onRetry={this.handleRetry} />
        }
        <SpeedDial />
      </div>
    )
  }

}

Activity.propTypes = {
  activity: PropTypes.object.isRequired,
  getActivity: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  activity: state.activity,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getActivity,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Activity)
