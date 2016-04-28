import React, {Component, PropTypes} from 'react'
import {withRouter} from 'react-router'
import {compose} from 'redux'
import {injectIntl, intlShape} from 'react-intl'

export default function withHook(WrappedComponent) {
  class Container extends Component {

    constructor(props) {
      super(props)
      this.setHook = this.setHook.bind(this)
    }

    componentDidMount() {
      this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave.bind(this))
    }

    setHook(hook) {
      this.hook = hook
    }

    routerWillLeave() {
      if (!this.hook || !this.hook()) {
        return true // no confirmation
      }
      return this.props.intl.formatMessage({id: 'confirm_leave_form'})
    }

    render() {
      return <WrappedComponent {...this.props} setHook={this.setHook} />
    }
  }

  Container.propTypes = {
    // from react-intl:
    intl: intlShape.isRequired,
    // from react-router:
    route: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  }

  return compose(
    withRouter,
    injectIntl,
  )(Container)
}
