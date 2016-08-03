import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {FormattedMessage, FormattedRelative} from 'react-intl'

import {Card, CardTitle, CardText} from 'material-ui/Card'

//import Paper from 'material-ui/Paper'

class ActivityCard extends Component {
  static propTypes = {
    // from parent:
    type: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    // from redux:
    userMap: PropTypes.object.isRequired,
    uid: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
    this.renderMember = this.renderMember.bind(this)
  }

  renderItem(row) {
    const author = this.props.userMap[row.author]
    return (
      <div key={row.id}>
        {author.name} / "{row.name}" / <FormattedRelative value={row.added} />
      </div>
    )
  }

  renderMember(row) {
    return (
      <div key={row.id}>
        {row.name} joined / <FormattedRelative value={row.joined} />
      </div>
    )
  }

  render() {
    const {type, data} = this.props

    if (!data.length) {
      return null
    }

    let renderer
    switch (type) {
      case 'members':
        renderer = this.renderMember
        break
      default:
        renderer = this.renderItem
    }

    return (
      <Card style={styles.container}>
        <CardTitle title={<FormattedMessage id={'activity.' + type} values={{num: data.length}} />} />
        <CardText>
          {
            data.map(renderer)
          }
        </CardText>
      </Card>
    )
  }
}

const styles = {
  container: {
    margin: '15px 15px 0',
    padding: '5px 15px',
  },
}

const mapStateToProps = (state) => ({
  userMap: state.tribe.userMap,
  uid: state.user.uid,
})

export default connect(mapStateToProps)(ActivityCard)
