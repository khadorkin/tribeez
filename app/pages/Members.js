import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage, FormattedDate } from 'react-intl'
import { Link } from 'react-router'

import Table from 'material-ui/lib/table/table'
import TableHeaderColumn from 'material-ui/lib/table/table-header-column'
import TableRow from 'material-ui/lib/table/table-row'
import TableHeader from 'material-ui/lib/table/table-header'
import TableRowColumn from 'material-ui/lib/table/table-row-column'
import TableBody from 'material-ui/lib/table/table-body'

import Card from 'material-ui/lib/card/card'
import CardTitle from 'material-ui/lib/card/card-title'
import CardText from 'material-ui/lib/card/card-text'
import TextField from 'material-ui/lib/text-field'
import CardActions from 'material-ui/lib/card/card-actions'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'
import Snackbar from 'material-ui/lib/snackbar'

import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

import Member from '../components/Member'

import styles from '../styles'

import updateInvite from '../actions/updateInvite'

class Members extends Component {

  constructor(props) {
    super(props)
    this.closeSnack = this.closeSnack.bind(this)
  }

  closeSnack() {
    this.props.updateInvite({
      snack: false,
    })
  }

  render() {
    return (
      <div>
        {
          this.props.tribe.users.map(user =>
            <Member user={user} key={user.id} />
          )
        }

        <FloatingActionButton style={styles.fab} containerElement={<Link to="/members/new" />}>
          <ContentAdd />
        </FloatingActionButton>

        <Snackbar
          open={this.props.snack}
          message="Invite sent!"
          onRequestClose={this.closeSnack}
          autoHideDuration={5000}
        />
      </div>
    )
  }

}

Members.propTypes = {
  tribe: PropTypes.object,
  snack: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  tribe: state.member.tribe,
  snack: state.invite.snack,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateInvite,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Members)
