import React, {Component} from 'react'

import PageView from '../hoc/PageView'
import AsyncContent from '../hoc/AsyncContent'
import Poll from '../components/Poll'
import Fab from '../components/Fab'

import routes from '../../common/routes'
import router from '../../common/router'

class Polls extends Component {
  static propTypes = {
    //
  }

  constructor(props) {
    super(props)
    this.handleFab = this.handleFab.bind(this)
  }

  handleFab() {
    const route = routes.POLLS_NEW
    route.edit = null
    router.push(route)
  }

  renderPoll(row) {
    return <Poll poll={row} />
  }

  render() {
    return (
      <PageView>
        <AsyncContent name="polls"
          renderRow={this.renderPoll}
        />
        <Fab name="add" onPress={this.handleFab} />
      </PageView>
    )
  }
}

export default Polls
