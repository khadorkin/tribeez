import React, {Component, PropTypes} from 'react'
import {withRouter, routerShape} from 'react-router'

class Link extends Component {
  static propTypes = {
    router: routerShape.isRequired,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  }

  constructor(props) {
    super(props)
    this.handleTap = this.handleTap.bind(this)
  }

  handleClick(event) {
    if (!event.defaultPrevented) {
      event.preventDefault()
    }
    event.stopPropagation()
  }

  handleTap(event) {
    if (event.button === 0) {
      return // left click
    }
    if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
      return // modified event
    }
    this.props.router.push(this.props.to)
    event.stopPropagation()
  }

  render() {
    const {router, to, ...props} = this.props

    props.href = router.createHref(to)
    props.onClick = this.handleClick
    props.onTouchTap = this.handleTap

    return <a {...props} />
  }
}

export default withRouter(Link)
