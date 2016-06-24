import React, {Component, PropTypes} from 'react'
import {View, ScrollView, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators, compose} from 'redux'
import {injectIntl, intlShape} from 'react-intl'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import AsyncContent from '../hoc/AsyncContent'
import Card from '../components/Card'
import Entry from '../components/Entry'

import colors from '../../common/constants/colors'
import getActivity from '../../common/actions/getActivity'
import getHistory from '../../common/actions/getHistory'

class Activity extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    // from redux:
    activity: PropTypes.object,
    history: PropTypes.object,
    // action creators:
    getActivity: PropTypes.func.isRequired,
    getHistory: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getActivity()
  }

  render() {
    const {activity, history, intl} = this.props

    return (
      <View style={styles.container}>
        <ScrollableTabView
          tabBarActiveTextColor="white"
          tabBarInactiveTextColor="white"
          tabBarUnderlineColor="white"
          tabBarBackgroundColor={colors.main}
        >
          <ScrollView tabLabel={intl.formatMessage({id: 'tab.activity'})} style={styles.content}>
            {
              activity.items.map((item, index) => (
                <Card key={index} item={item} />
              ))
            }
          </ScrollView>
          <AsyncContent
            data={history}
            fetcher={this.props.getHistory}
            rowComponent={Entry}
            tabLabel={intl.formatMessage({id: 'tab.history'})}
          />
        </ScrollableTabView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 4,
  },
})

const mapStateToProps = (state) => ({
  activity: state.activity,
  history: state.history,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getActivity,
  getHistory,
}, dispatch)

export default compose(
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps)
)(Activity)
