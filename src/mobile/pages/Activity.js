import React, {Component, PropTypes} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import getActivity from '../../common/actions/getActivity'

import Entry from '../components/Entry'
import Spinner from '../components/Spinner'
import AsyncContent from '../hoc/AsyncContent'

class Activity extends Component {
  static propTypes = {
    // from redux:
    activity: PropTypes.object,
    // action creators:
    getActivity: PropTypes.func.isRequired,
  }

  render() {
    const {activity, activity: {items}} = this.props

    return (
      <AsyncContent data={activity} fetcher={this.props.getActivity}>
        {
          items.map((entry) =>
            <Entry entry={entry} key={entry.id} />
          )
        }
        <Spinner visible={activity.loading} />
      </AsyncContent>
    )
  }

}

const mapStateToProps = (state) => ({
  activity: state.activity,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getActivity,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Activity)
