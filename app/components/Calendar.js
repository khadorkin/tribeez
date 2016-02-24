import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'

class Calendar extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>Calendar</div>
    )
  }

}

Calendar.propTypes = {
  //
}

const mapStateToProps = (state) => ({
  //
})

export default connect(mapStateToProps)(Calendar)
