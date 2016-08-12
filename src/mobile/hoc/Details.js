import React, {Component, PropTypes} from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Header from '../components/Header'
import FormattedMessage from '../components/FormattedMessage'

import listenItem from '../../common/actions/listenItem'

import colors from '../../common/constants/colors'

class Details extends Component {
  static propTypes = {
    // from parent component
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    children: PropTypes.node,
    // action creators:
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }

  componentDidMount() {
    this.props.subscribe(this.props.type, this.props.id)
  }

  componentWillUnmount() {
    this.props.unsubscribe()
  }

  render() {
    const {loading, error, children} = this.props

    let content = children

    if (loading) {
      content = (
        <View style={styles.empty}>
          <ActivityIndicator size="large" color={colors.main} />
        </View>
      )
    }

    if (error) {
      content = (
        <View style={styles.empty}>
          <FormattedMessage id={'error.' + error} style={styles.error} />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Header only="image" />
        {content}
        <Header style={styles.shadow} only="shadow" />
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
