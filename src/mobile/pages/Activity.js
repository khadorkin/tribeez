import React, {Component, PropTypes} from 'react'
import {View, Linking, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import TabView from '../hoc/TabView'
import AsyncContent from '../hoc/AsyncContent'
import Card from '../components/Card'
import Entry from '../components/Entry'
import IconButton from '../components/IconButton'
import FormattedMessage from '../components/FormattedMessage'

import config from '../../common/config'
import getActivity from '../../common/actions/getActivity'
import getHistory from '../../common/actions/getHistory'

class Activity extends Component {
  static propTypes = {
    // from redux:
    activity: PropTypes.object,
    history: PropTypes.object,
    telegram_token: PropTypes.string,
    // action creators:
    getActivity: PropTypes.func.isRequired,
    getHistory: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleTelegram = this.handleTelegram.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
  }

  handleTelegram() {
    Linking
      .openURL('tg://resolve?domain=' + config.telegram_bot_name + '&start=' + this.props.telegram_token)
      .catch(() => {
        Linking.openURL('https://telegram.me/' + config.telegram_bot_name + '?start=' + this.props.telegram_token)
      })
  }

  renderFooter() {
    return (
      <IconButton
        family="evil"
        name="sc-telegram"
        color="gray"
        onPress={this.handleTelegram}
        style={styles.telegram}
      >
        <FormattedMessage id="telegram" />
      </IconButton>
    )
  }

  render() {
    const {activity, history} = this.props

    return (
      <View style={styles.container}>
        <TabView>
          <AsyncContent
            data={activity}
            fetcher={this.props.getActivity}
            rowComponent={Card}
            tabLabel="tab.activity"
            footer={this.renderFooter()}
          />
          <AsyncContent
            data={history}
            fetcher={this.props.getHistory}
            rowComponent={Entry}
            tabLabel="tab.history"
          />
        </TabView>
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
  telegram: {
    alignSelf: 'center',
  },
})

const mapStateToProps = (state) => ({
  activity: state.activity,
  history: state.history,
  telegram_token: state.member.user.telegram_token,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getActivity,
  getHistory,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Activity)
