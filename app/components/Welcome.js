import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'

import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardTitle from 'material-ui/lib/card/card-title'
import FlatButton from 'material-ui/lib/flat-button'
import CardText from 'material-ui/lib/card/card-text'

export default class Welcome extends Component {

  render() {
    return (
      <form>
        <Card>
          <CardTitle title="Welcome" subtitle="Organize your group life" />
          <CardText></CardText>
          <CardActions>
            <FlatButton primary={true} label="Register" containerElement={<Link to="/register" />} />
          </CardActions>
        </Card>
      </form>
    )
  }

}
