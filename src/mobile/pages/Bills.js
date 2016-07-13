import React, {Component, PropTypes} from 'react'
import {View, ScrollView, StyleSheet} from 'react-native'

import {connect} from 'react-redux'

import TabView from '../hoc/TabView'
import AsyncContent from '../hoc/AsyncContent'
import Bill from '../components/Bill'
import Balance from '../components/Balance'
import Fab from '../components/Fab'

import routes from '../../common/routes'
import router from '../../common/router'

class Bills extends Component {
  static propTypes = {
    // redux state:
    users: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleFab = this.handleFab.bind(this)
  }

  handleFab() {
    router.push(routes.BILLS_NEW)
  }

  render() {
    return (
      <View style={styles.container}>
        <TabView>
          <AsyncContent name="bills"
            rowComponent={Bill}
            tabLabel="tab.bills"
          />
          <ScrollView tabLabel="tab.balances" style={styles.content}>
            {
              this.props.users.map((user) =>
                <Balance user={user} key={user.uid} />
              )
            }
            <View style={styles.spacer} />
          </ScrollView>
        </TabView>
        <Fab name="add" onPress={this.handleFab} />
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
  content: {
    paddingTop: 4,
  },
  spacer: {
    height: 80,
  },
})

export default connect(mapStateToProps)(Bills)
