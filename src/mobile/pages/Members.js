import React, {Component, PropTypes} from 'react'
import {View, ScrollView, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators, compose} from 'redux'
import {injectIntl, intlShape} from 'react-intl'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import Member from '../components/Member'
import Invite from '../components/Invite'
import Fab from '../components/Fab'
import AsyncContent from '../hoc/AsyncContent'

import routes from '../../common/routes'
import router from '../../common/router'
import colors from '../../common/constants/colors'
import getInvites from '../../common/actions/getInvites'

class Members extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    // redux state:
    users: PropTypes.array.isRequired,
    invites: PropTypes.object.isRequired,
    // action creators:
    getInvites: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleFab = this.handleFab.bind(this)
  }

  handleFab() {
    router.push(routes.MEMBERS_NEW)
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          tabBarActiveTextColor="white"
          tabBarInactiveTextColor="white"
          tabBarUnderlineColor="white"
          tabBarBackgroundColor={colors.main}
        >
          <ScrollView tabLabel={this.props.intl.formatMessage({id: 'tab.registered'})} style={styles.content}>
            {
              this.props.users.map((user) =>
                <Member user={user} key={user.id} />
              )
            }
            <View style={styles.spacer} />
          </ScrollView>
          <AsyncContent
            data={this.props.invites}
            fetcher={this.props.getInvites}
            rowComponent={Invite}
            tabLabel={this.props.intl.formatMessage({id: 'tab.invited'})}
          />
        </ScrollableTabView>
        <Fab name="add" onPress={this.handleFab} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.member.tribe.users,
  invites: state.invites,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getInvites,
}, dispatch)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 4,
  },
  spacer: {
    height: 80,
  },
})

export default compose(
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps)
)(Members)
