import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { routeActions } from 'react-router-redux'
import { FormattedMessage, FormattedRelative } from 'react-intl'
import { Link } from 'react-router'

import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardHeader from 'material-ui/lib/card/card-title'
import CardText from 'material-ui/lib/card/card-text'

import activity from '../actions/activity'

class Home extends Component {

  componentDidMount() {
    this.props.activity(0, 10)
  }

  render() {
    return (
      <div>
        {
          this.props.entries.map((entry) => {
            let title = <FormattedMessage id={'entry.' + entry.type} values={{name: entry.user_name}} />
            let date = <FormattedRelative value={entry.added * 1000} />
            let comments = <FormattedMessage id="entry.comments" values={{num: entry.comments.length}} />
            return (
              <Card key={entry.id}>
                <CardHeader title={title} subtitle={<span>{date} — {comments}</span>} actAsExpander={true} showExpandableButton={true} />
                <CardText expandable={true}>
                  <ul>
                    {
                      entry.comments.map((comment) => {
                        return <li key={comment.id}>{comment.content}</li>
                      })
                    }
                  </ul>
                </CardText>
              </Card>
            )
          })
        }
      </div>
    )
  }

}

Home.propTypes = {
  name: PropTypes.string,
  lang: PropTypes.string,
  balance: PropTypes.number,
  entries: PropTypes.array,
}

const mapStateToProps = (state) => ({
  name: state.user.data.name,
  lang: state.user.data.lang,
  balance: state.user.data.balance,
  entries: state.activity.entries,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  activity,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
