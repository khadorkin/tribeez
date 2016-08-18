import React, {Component, PropTypes} from 'react'
import {ActivityIndicator, View, ScrollView, Text, StyleSheet/*, Linking*/} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import TabView from '../hoc/TabView'
import ActivityCard from '../components/ActivityCard'
import AsyncContent from '../hoc/AsyncContent'
import Entry from '../components/Entry'
import Button from '../components/Button'
// import IconButton from '../components/IconButton'
import FormattedMessage from '../components/FormattedMessage'

import routes from '../../common/routes'
import router from '../../common/router'

import {android} from '../../common/config'
import {ACTIVITIES} from '../../common/constants/product'
import colors from '../../common/constants/colors'
import listenActivity from '../../common/actions/listenActivity'

class Activity extends Component {
  static propTypes = {
    // from redux:
    tid: PropTypes.string,
    other_members: PropTypes.array.isRequired,
    activity: PropTypes.object.isRequired,
    unread: PropTypes.number,
    bot_token: PropTypes.string,
    // action creators:
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.load = this.load.bind(this)
    //this.handleTelegram = this.handleTelegram.bind(this)
    this.ref = this.ref.bind(this)
    this.handleChange = this.handleChange.bind(this)
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
    if (this.tid !== tid) { // new tid (login) or modified (switch)
      this.props.unsubscribe()
      if (tid) {
        this.props.subscribe(tid)
      }
      this.tid = tid
    }
  }

  // handleTelegram() {
  //   Linking
  //     .openURL('tg://resolve?domain=' + config.telegram_bot_name + '&start=' + this.props.bot_token)
  //     .catch(() => {
  //       Linking.openURL('https://telegram.me/' + config.telegram_bot_name + '?start=' + this.props.bot_token)
  //     })
  // }

  renderHistoryEntry(row) {
    return <Entry entry={row} />
  }

  handleChange(tab) {
    if (this.history) {
      this.history.setVisible(tab.i === 1)
    }
  }

  handleInvite() {
    router.push(routes.MEMBERS_NEW)
  }

  ref(element) {
    if (element) {
      this.history = element.getWrappedInstance()
    }
  }

  render() {
    const {other_members, activity, unread} = this.props

    //const notEmpty = (other_members.length > 0 || ACTIVITIES.some((type) => activity[type].length > 0))

    let inviteButton
    if (other_members.length === 0 && !activity.loading) {
      inviteButton = (
        <View>
          <FormattedMessage id="welcome_message" style={styles.welcome} />
          <Button id="invite_button" flat={true} onPress={this.handleInvite} />
        </View>
      )
    }

    const new_members = other_members.filter((user) => (user.joined > Date.now() - (7 * 86400 * 1000))) // new ones only

    return (
      <TabView onChangeTab={this.handleChange}>
        <ScrollView tabLabel="tab.activity">
          <ActivityCard type="members" data={new_members} />
          {
            ACTIVITIES.map((type) =>
              <ActivityCard key={type} type={type} data={activity[type]} />
            )
          }
          <View style={styles.footer}>
            <ActivityIndicator size="small" color={colors.main} animating={activity.loading} />
            {inviteButton}
            {
              // notEmpty && (
              //   <IconButton
              //     family="evil"
              //     name="sc-telegram"
              //     color="gray"
              //     onPress={this.handleTelegram}
              //     iconStyle={styles.telegramIcon}
              //   >
              //     <FormattedMessage id="telegram" />
              //   </IconButton>
              // )
            }
            <Text style={styles.version}>
              App version: beta {android.appVersion}
            </Text>
          </View>
        </ScrollView>
        <AsyncContent name="history"
          ref={this.ref}
          renderRow={this.renderHistoryEntry}
          tabLabel="tab.history"
          badge={unread > 0 && unread}
        />
      </TabView>
    )
  }
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  welcome: {
    color: colors.main,
    paddingHorizontal: 48,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  //TODO: add:
  // telegramIcon: {
  //   marginTop: 8,
  // },
  //TODO: remove (or move):
  version: {
    marginTop: 32,
    fontSize: 10,
    height: 20,
  },
})

const mapStateToProps = (state) => ({
  tid: state.tribe.id,
  other_members: state.tribe.users.filter((user) => user.uid !== state.user.uid),
  activity: state.activity,
  unread: state.app.unread,
  bot_token: state.user.bot_token,
  lang: state.app.lang, // hack to force update when lang changes
  currency: state.tribe.currency, // hack to force update when currency changes
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  subscribe: listenActivity.on,
  unsubscribe: listenActivity.off,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Activity)
