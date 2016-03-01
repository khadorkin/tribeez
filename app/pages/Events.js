import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage} from 'react-intl'

import Calendar from '../components/Calendar'

class Events extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Calendar />
    )
  }

}

Events.propTypes = {
  //
}

const mapStateToProps = (state) => ({
  //
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  //
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Events)
