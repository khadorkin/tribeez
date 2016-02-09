import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'

import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardTitle from 'material-ui/lib/card/card-title'
import CardText from 'material-ui/lib/card/card-text'

class Invite extends Component {

  render() {
    return (
      <div>
        Invite to join your tribe:
      </div>
    )
  }

}

Invite.propTypes = {
  name: PropTypes.string,
}

const mapStateToProps = (state) => ({
  name: state.user.data.name,
})

export default connect(mapStateToProps)(Invite)
