import React, {Component, PropTypes} from 'react'
import {View, ScrollView, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import getInvites from '../../common/actions/getInvites'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import Member from '../components/Member'
import Invite from '../components/Invite'
import Fab from '../components/Fab'

import AsyncContent from '../hoc/AsyncContent'

import colors from '../../common/constants/colors'

class Members extends Component {
  static propTypes = {
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
    //TODO: go to add member form
  }

  render() {
    const {invites} = this.props

    return (
      <View style={styles.container}>
        <ScrollableTabView
          tabBarActiveTextColor={colors.main}
          tabBarInactiveTextColor={colors.main}
          tabBarUnderlineColor={colors.main}
        >
          <ScrollView tabLabel="Registered" style={styles.content}>
            {
              this.props.users.map((user) =>
                <Member user={user} key={user.id} />
              )
            }
          </ScrollView>
          <AsyncContent data={invites} fetcher={this.props.getInvites} tabLabel="Invited">
            {
              invites.items.map((invite) =>
                <Invite invite={invite} key={invite.email} />
              )
            }
          </AsyncContent>
        </ScrollableTabView>
        <View style={styles.fab}>
          <Fab onPress={this.handleFab} />
        </View>
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
    paddingTop: 4,
    flex: 1,
  },
  content: {
    paddingTop: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Members)
