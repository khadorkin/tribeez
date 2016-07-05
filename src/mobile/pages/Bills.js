import React, {Component, PropTypes} from 'react'
import {View, ScrollView, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import TabView from '../hoc/TabView'
import AsyncContent from '../hoc/AsyncContent'
import Bill from '../components/Bill'
import Balance from '../components/Balance'
import Fab from '../components/Fab'

import routes from '../../common/routes'
import router from '../../common/router'
import getBills from '../../common/actions/getBills'

class Bills extends Component {
  static propTypes = {
    // redux state:
    bills: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    // action creators:
    getBills: PropTypes.func.isRequired,
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
          <AsyncContent
            data={this.props.bills}
            fetcher={this.props.getBills}
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
  bills: state.bills,
  users: state.tribe.users,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getBills,
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

export default connect(mapStateToProps, mapDispatchToProps)(Bills)
