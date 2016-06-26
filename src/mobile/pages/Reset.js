import React, {Component, PropTypes} from 'react'
import {View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import ResetForm from '../forms/Reset'

import getReset from '../../common/actions/getReset'

class Reset extends Component {
  static propTypes = {
    // from parent:
    token: PropTypes.string.isRequired,
    // action creators:
    getReset: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getReset(this.props.token)
  }

  render() {
    return (
      <View style={styles.container}>
        <ResetForm token={this.props.token} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getReset,
}, dispatch)

export default connect(null, mapDispatchToProps)(Reset)
