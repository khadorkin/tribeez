import React, {Component, PropTypes} from 'react'
import {View, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import AsyncContent from '../hoc/AsyncContent'
import Bill from '../components/Bill'
import Fab from '../components/Fab'

import routes from '../../common/routes'
import router from '../../common/router'
import getBills from '../../common/actions/getBills'

class Bills extends Component {
  static propTypes = {
    // redux state:
    bills: PropTypes.object.isRequired,
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
    const {bills, bills: {items}} = this.props

    return (
      <View style={styles.container}>
        <AsyncContent data={bills} fetcher={this.props.getBills}>
          {
            items.map((bill) =>
              <Bill bill={bill} key={bill.id} />
            )
          }
        </AsyncContent>
        <Fab name="add" onPress={this.handleFab} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  bills: state.bills,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getBills,
}, dispatch)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Bills)
