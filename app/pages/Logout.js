import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'

import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import CardActions from 'material-ui/lib/card/card-actions'
import FlatButton from 'material-ui/lib/flat-button'

import getLogout from '../actions/getLogout'

class Logout extends Component {

  componentWillMount() {
    this.props.getLogout()
  }

  render() {
    return (
      <Card className="main">
        <CardText>
          <p className="error">{this.props.error && <FormattedMessage id={'error.' + this.props.error} />}</p>
        </CardText>
        <CardActions>
          <FlatButton label="Try again" onClick={this.props.logout} />
        </CardActions>
      </Card>
    )
  }

}

Logout.propTypes = {
  error: PropTypes.string,
}

const mapStateToProps = (state) => ({
  error: state.logout.error,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getLogout,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
