import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { routeActions } from 'react-router-redux'
import { FormattedMessage } from 'react-intl'

import getUser from '../actions/getUser'

export default class Home extends Component {

  componentDidMount() {
    this.props.getUser()
  }

  render() {
    return (
      <div>
        <FormattedMessage id="welcome" values={{name: this.props.name}} />
      </div>
    )
  }

}

Home.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  id: PropTypes.number,
  name: PropTypes.string,
  lang: PropTypes.string,
  balance: PropTypes.number,
}

const mapStateToProps = (state) => ({
  loading: state.user.loading,
  error: state.user.error,
  id: state.user.data.id,
  name: state.user.data.name,
  lang: state.user.data.lang,
  balance: state.user.data.balance,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUser,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
