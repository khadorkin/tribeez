import React from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'

export default class Home extends React.Component {

  constructor(props) {
    super(props)
    /* TODO
    if (!this.props.email) {
      this.props.dispatch(routeActions.push('/login'))
    }
    */
  }

  render() {
    return (
      <div>Welcome, {this.props.email}</div>
    )
  }

}

Home.propTypes = {
  email: React.PropTypes.string,
}

export default connect(
  state => ({
    email: state.login.email,
  })
)(Home)
