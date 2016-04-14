import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import RaisedButton from 'material-ui/lib/raised-button'

class AsyncContent extends Component {

  constructor(props) {
    super(props)
    this.ref = this.ref.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleLoad = this.handleLoad.bind(this)
  }

  componentWillMount() {
    if (this.props.uid) {
      this.uid = this.props.uid
      this.handleLoad()
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillReceiveProps(props) {
    if (props.uid && !this.uid) {
      this.uid = props.uid
      this.handleLoad()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  ref(element) {
    this.element = element
  }

  handleScroll() {
    const atBottom = (document.body.scrollTop > this.element.scrollHeight - window.innerHeight)
    if (this.element && this.props.data.paging && atBottom) {
      this.handleLoad(true)
    }
  }

  handleLoad(more) {
    const data = this.props.data
    if (!data.loading && (data.pages === 0 || (more && data.items.length / data.paging === data.pages))) {
      this.props.fetcher(data.pages) // last page is N => N+1 pages => next page is N+1
    }
  }

  render() {
    const {error} = this.props.data

    if (error) {
      return (
        <div style={{textAlign: 'center', padding: '40px 0'}}>
          <div style={{marginBottom: 20, color: 'red'}}>Error: {error}</div>
          <RaisedButton label="Retry" onTouchTap={this.handleLoad} />
        </div>
      )
    } else {
      return (
        <div style={this.props.style} ref={this.ref}>
          {this.props.children}
        </div>
      )
    }
  }

}

AsyncContent.propTypes = {
  // redux state
  uid: PropTypes.number,
  // from parent component
  data: PropTypes.object.isRequired,
  fetcher: PropTypes.func.isRequired,
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
}

const mapStateToProps = (state) => ({
  uid: state.member.user.id,
})

export default connect(mapStateToProps)(AsyncContent)
