import React from 'react'
const PropTypes = React.PropTypes
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage} from 'react-intl'

class Tasks extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>Tasks</div>
    )
  }

}

Tasks.propTypes = {
  //
}

const mapStateToProps = (state) => ({
  //
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  //
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
