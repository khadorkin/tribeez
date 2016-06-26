import React, {Component, PropTypes} from 'react'
import {View, ScrollView, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import AsyncContent from '../hoc/AsyncContent'
import Bill from '../components/Bill'
import Balance from '../components/Balance'
import Fab from '../components/Fab'

import routes from '../../common/routes'
import router from '../../common/router'
import colors from '../../common/constants/colors'
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
        <ScrollableTabView
          tabBarActiveTextColor="white"
          tabBarInactiveTextColor="white"
          tabBarUnderlineColor="white"
          tabBarBackgroundColor={colors.main}
        >
          <AsyncContent
            data={this.props.bills}
            fetcher={this.props.getBills}
            rowComponent={Bill}
            tabLabel="LIST"
          />
          <ScrollView tabLabel="BALANCES" style={styles.content}>
            {
              this.props.users.map((user) =>
                <Balance user={user} key={user.id} />
              )
            }
            <View style={styles.spacer} />
          </ScrollView>
        </ScrollableTabView>
        <Fab name="add" onPress={this.handleFab} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  bills: state.bills,
  users: state.member.tribe.users,
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
