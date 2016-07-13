import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Text} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class Card extends Component {
  static propTypes = {
    // from parent:
    item: PropTypes.object,
    // from redux:
    users: PropTypes.array.isRequired,
    currency: PropTypes.string,
    uid: PropTypes.string,
    // action creators:
    //TODO
  }

  render() {
    const {item} = this.props

    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(item)}</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.tribe.users,
  currency: state.tribe.currency,
  uid: state.user.uid,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  //TODO
}, dispatch)

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 5,
    marginHorizontal: 8,
    padding: 8,
    elevation: 1,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Card)
