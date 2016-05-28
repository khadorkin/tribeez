import React, {Component, PropTypes} from 'react'
import {StyleSheet, View} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import getActivity from '../../common/actions/getActivity'

import Entry from '../components/Entry'

class Activity extends Component {
  static propTypes = {
    // from redux:
    activity: PropTypes.object,
    // action creators:
    getActivity: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getActivity(0) //TODO: load more on scroll
  }

  render() {
    const {activity: {items}} = this.props

    return (
      <View style={styles.container}>
        {
          items.map((entry) =>
            <Entry entry={entry} key={entry.id} />
          )
        }
      </View>
    )
  }

}

const mapStateToProps = (state) => ({
  activity: state.activity,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getActivity,
}, dispatch)

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Activity)
