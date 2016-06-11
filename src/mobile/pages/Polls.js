import React, {Component, PropTypes} from 'react'
import {View, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import AsyncContent from '../hoc/AsyncContent'
import Poll from '../components/Poll'
import Fab from '../components/Fab'

import routes from '../../common/routes'
import router from '../../common/router'
import getPolls from '../../common/actions/getPolls'

class Polls extends Component {
  static propTypes = {
    // redux state:
    polls: PropTypes.object.isRequired,
    // action creators:
    getPolls: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleFab = this.handleFab.bind(this)
  }

  handleFab() {
    router.push(routes.POLLS_NEW)
  }

  render() {
    const {polls} = this.props

    return (
      <View style={styles.container}>
        <AsyncContent data={polls} fetcher={this.props.getPolls}>
          {
            polls.items.map((poll) =>
              <Poll poll={poll} key={poll.id} />
            )
          }
        </AsyncContent>
        <Fab name="add" onPress={this.handleFab} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const mapStateToProps = (state) => ({
  polls: state.polls,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPolls,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Polls)
