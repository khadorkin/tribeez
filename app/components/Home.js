import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { routeActions } from 'react-router-redux'

import fetchUser from '../actions/user'

export default class Home extends Component {

  componentDidMount() {
    if (!this.props.token) {
      this.props.redirectToLogin()
      return
    }

    this.props.fetchUser(this.props.token)
  }

  render() {
    return (
      <div>Welcome, {this.props.name}</div>
    )
  }

}

Home.propTypes = {
  token: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  id: PropTypes.number,
  name: PropTypes.string,
  lang: PropTypes.string,
  balance: PropTypes.number,
}

const mapStateToProps = (state) => ({
  token: state.login.token,
  loading: state.user.loading,
  error: state.user.error,
  id: state.user.data.id,
  name: state.user.data.name,
  lang: state.user.data.lang,
  balance: state.user.data.balance,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchUser,
  redirectToLogin: () => routeActions.replace('/login'),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
