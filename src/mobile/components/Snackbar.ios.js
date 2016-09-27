import React, {Component, PropTypes} from 'react'
import {Animated, TouchableOpacity, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators, compose} from 'redux'
import {injectIntl, intlShape} from 'react-intl'

import FormattedMessage from './FormattedMessage'

import {closeSnack} from '../../common/actions/app'

import colors from '../../common/constants/colors'

const HEIGHT = 55

class Snackbar extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    // from redux:
    userMap: PropTypes.object.isRequired,
    uid: PropTypes.string,
    snack: PropTypes.object.isRequired,
    // action creators:
    closeSnack: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      bottom: new Animated.Value(-HEIGHT),
    }
    this.handlePress = this.handlePress.bind(this)
  }

  componentWillReceiveProps(props) {
    const {snack} = props

    if (snack.open !== this.props.snack.open) {
      return
    }

    Animated.timing(this.state.bottom, {
      toValue: snack.open ? 0 : -HEIGHT,
      duration: 200,
    }).start()

    if (snack.open) {
      this.timeout = setTimeout(this.props.closeSnack, 3000)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  handlePress() {
    this.props.closeSnack()
    clearTimeout(this.timeout)
  }

  render() {
    const {snack, userMap, uid} = this.props

    let snack_author_name
    if (snack.author) {
      const snack_author = userMap[snack.author]
      snack_author_name = (snack.author === uid ? '_you_' : snack_author.name)
    }

    const id = 'snack.' + (snack.message || 'error')
    const values = {author: snack_author_name, name: snack.name}

    const style = {
      bottom: this.state.bottom,
    }

    return (
      <Animated.View style={[styles.container, style]}>
        <TouchableOpacity onPress={this.handlePress}>
          <FormattedMessage style={styles.text} id={id} values={values} />
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: colors.snack,
  },
  text: {
    color: colors.lightText,
    padding: 16,
  },
})

const mapStateToProps = (state) => ({
  userMap: state.tribe.userMap,
  uid: state.user.uid,
  snack: state.app.snack,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  closeSnack,
}, dispatch)

export default compose(
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps)
)(Snackbar)
