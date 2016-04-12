import React from 'react'
const PropTypes = React.PropTypes

import Card from 'material-ui/lib/card/card'

import PollForm from '../forms/Poll'

class Poll extends React.Component {

  render() {
    return (
      <Card>
        <PollForm id={this.props.params.id ? Number(this.props.params.id) : null} current={this.props.location.state} />
      </Card>
    )
  }

}

Poll.propTypes = {
  // from react-router:
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default Poll
