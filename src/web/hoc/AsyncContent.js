import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'

import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

import colors from '../../common/constants/colors'

class AsyncContent extends Component {
  static propTypes = {
    // redux state
    uid: PropTypes.number,
    // from parent component
    data: PropTypes.object.isRequired,
    fetcher: PropTypes.func.isRequired,
    style: PropTypes.object,
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props)
    this.ref = this.ref.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleLoad = this.handleLoad.bind(this)
  }

  componentDidMount() {
    if (this.props.uid) {
      this.uid = this.props.uid
      this.handleLoad()
    }
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
    if (!this.element) {
      return
    }
    const atBottom = (document.body.scrollTop > this.element.scrollHeight - window.innerHeight)
    if (this.props.data.paging && atBottom) {
      this.handleLoad(true)
    }
  }

  handleLoad(more) {
    const data = this.props.data
    if (data.loading) {
      return
    }
    if (!data.pages || (more && data.items.length / data.paging === data.pages)) {
      this.props.fetcher(data.pages) // last page is N => N+1 pages => next page is N+1
    }
  }

  render() {
    const {error, loading} = this.props.data

    if (error) {
      return (
        <div style={styles.errorContainer}>
          <div style={styles.errorText}>{error}</div>
          <RaisedButton label={<FormattedMessage id="retry" />} onTouchTap={this.handleLoad} />
        </div>
      )
    } else {
      return (
        <div style={this.props.style} ref={this.ref}>
          {this.props.children}
          {
            ( loading &&
              <div style={styles.loading}>
                <CircularProgress color={colors.main} size={0.5} style={{textAlign: 'center'}} />
              </div>
            )
          }
        </div>
      )
    }
  }
}

const styles = {
  errorContainer: {
    textAlign: 'center',
    padding: '40px 0',
  },
  errorText: {
    marginBottom: 20,
    color: 'red',
  },
  loading: {
    textAlign: 'center',
    padding: 20,
  },
}

const mapStateToProps = (state) => ({
  uid: state.member.user.id,
})

export default connect(mapStateToProps)(AsyncContent)
