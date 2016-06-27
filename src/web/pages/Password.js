import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {FormattedMessage} from 'react-intl'

import {Card} from 'material-ui/Card'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import PasswordForm from '../forms/Password'

import routes from '../routes'

class Password extends Component {
  static propTypes = {
    sent: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <Card className="main">
        <PasswordForm />
        <Dialog
          actions={[<FlatButton label="OK" primary={true} containerElement={<Link to={routes.WELCOME} />} style={{textAlign: 'center'}} />]}
          open={this.props.sent}
        >
          <FormattedMessage id="dialog_reset_title" /><br />
          <FormattedMessage id="dialog_reset_text" />
        </Dialog>
      </Card>
    )
  }
}

const mapStateToProps = (state) => ({
  sent: state.password.sent,
})

export default connect(mapStateToProps)(Password)
