import React from 'react'
const PropTypes = React.PropTypes
import {connect} from 'react-redux'
import {Link} from 'react-router'

import Card from 'material-ui/lib/card/card'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'

import PasswordForm from '../forms/Password'

import routes from '../constants/routes'

class Password extends React.Component {

  render() {
    return (
      <Card className="main">
        <PasswordForm />
        <Dialog
          actions={[<FlatButton label="OK" primary={true} containerElement={<Link to={routes.WELCOME} />} style={{textAlign: 'center'}} />]}
          open={this.props.sent}
        >
          A reset link has been sent to your email address.<br />
          Click on that link to reset your password.
        </Dialog>
      </Card>
    )
  }

}

Password.propTypes = {
  sent: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  sent: state.password.sent,
})

export default connect(mapStateToProps)(Password)
