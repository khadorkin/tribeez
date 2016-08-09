import React, {Component, PropTypes} from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Header from '../components/Header'
import FormattedMessage from '../components/FormattedMessage'
import Fab from '../components/Fab'

import listenItem from '../../common/actions/listenItem'

import colors from '../../common/constants/colors'
import router from '../../common/router'

class Details extends Component {
  static propTypes = {
    // from parent component
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    item: PropTypes.object,
    children: PropTypes.node,
    editRoute: PropTypes.object,
    // action creators:
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.handleFab = this.handleFab.bind(this)
  }

  componentDidMount() {
    this.props.subscribe(this.props.type, this.props.id)
  }

  componentWillUnmount() {
    this.props.unsubscribe()
  }

  handleFab() {
    const route = this.props.editRoute
    route.props = {
      current: this.props.item,
    }
    router.push(route)
  }

  render() {
    const {loading, error, item, children, editRoute} = this.props

    if (loading) { //TODO: separate cases or remove loading check?
      return (
        <View style={styles.empty}>
          <ActivityIndicator size="large" color={colors.main} />
        </View>
      )
    }

    if (error) {
      return (
        <View style={styles.empty}>
          <FormattedMessage id={'error.' + error} style={styles.error} />
        </View>
      )
    }

    // item is null when logging out and on firebase error

    return (
      <View style={styles.container}>
        <Header only="image" />
        {item && children}
        <Header style={styles.shadow} only="shadow" />
        {editRoute && <Fab name="edit" onPress={this.handleFab} />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  empty: {
    flex: 1, // take all space
    justifyContent: 'center', // vertically center
    alignItems: 'center', // horizontally center
  },
  error: {
    color: colors.error,
    textAlign: 'center',
    margin: 32,
  },
  container: {
    flex: 1,
  },
  shadow: {
    position: 'absolute',
    top: Header.height,
  },
})

const mapStateToProps = (state) => ({
  loading: state.app.loading > 0,
  error: state.item.error,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  subscribe: listenItem.on,
  unsubscribe: listenItem.off,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Details)
