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
    uid: PropTypes.number,
    // action creators:
    //TODO
  }

  render() {
    const {item} = this.props

    return (
      <View style={styles.container}>
        <Text>{item.type}</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.member.tribe.users,
  currency: state.member.tribe.currency,
  uid: state.member.user.id,
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
