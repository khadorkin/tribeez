import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'

import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import CardActions from 'material-ui/lib/card/card-actions'
import FlatButton from 'material-ui/lib/flat-button'

import postLogout from '../actions/postLogout'

//TODO: is this component really useful?

class Logout extends Component {

  componentWillMount() {
    this.props.postLogout()
  }

  render() {
    return (
      <Card style={{margin: '15px 10px 0'}}>
        <CardText>
          <p className="error">{this.props.error && <FormattedMessage id={`error.${this.props.error}`} />}</p>
        </CardText>
        <CardActions>
          <FlatButton label="Try again" onTouchTap={this.props.postLogout} />
        </CardActions>
      </Card>
    )
  }

}

Logout.propTypes = {
  error: PropTypes.string,
  postLogout: PropTypes.func,
}

const mapStateToProps = (state) => ({
  error: state.logout.error,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postLogout,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
