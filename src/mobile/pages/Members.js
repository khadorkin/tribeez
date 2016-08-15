import React, {Component, PropTypes} from 'react'
import {View, ScrollView, StyleSheet} from 'react-native'

import {connect} from 'react-redux'

import TabView from '../hoc/TabView'
import Member from '../components/Member'
import Invite from '../components/Invite'
import Fab from '../components/Fab'
import AsyncContent from '../hoc/AsyncContent'

import routes from '../../common/routes'
import router from '../../common/router'

class Members extends Component {
  static propTypes = {
    // redux state:
    users: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleFab = this.handleFab.bind(this)
  }

  handleFab() {
    router.push(routes.MEMBERS_NEW)
  }

  renderInvite(row) {
    return <Invite invite={row} />
  }

  render() {
    return (
      <View style={styles.container}>
        <TabView>
          <ScrollView tabLabel="tab.registered">
            {
              this.props.users.map((user) =>
                <Member user={user} key={user.uid} />
              )
            }
            <View style={styles.spacer} />
          </ScrollView>
          <AsyncContent name="invites"
            renderRow={this.renderInvite}
            tabLabel="tab.invited"
          />
        </TabView>
        <Fab name="add" onPress={this.handleFab} type="members" />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.tribe.users,
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spacer: {
    height: 80,
  },
})

export default connect(mapStateToProps)(Members)
