import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'

import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import CardActions from 'material-ui/lib/card/card-actions'
import FlatButton from 'material-ui/lib/flat-button'

import logout from '../actions/logout'

class Logout extends Component {

  componentDidMount() {
    this.props.logout()
  }

  render() {
    return (
      <form>
        <Card>
          <CardText>
            <p className="error">{this.props.error && <FormattedMessage id={'error.' + this.props.error} />}</p>
          </CardText>
          <CardActions>
            <FlatButton label="Try again" onClick={this.props.logout} />
          </CardActions>
        </Card>
      </form>
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
  logout,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
