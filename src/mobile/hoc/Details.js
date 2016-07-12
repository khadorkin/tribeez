import React, {Component, PropTypes} from 'react'
import {StyleSheet, View} from 'react-native'

import Spinner from '../components/Spinner'
import Button from '../components/Button'
import FormattedMessage from '../components/FormattedMessage'
import Fab from '../components/Fab'

import colors from '../../common/constants/colors'
import router from '../../common/router'

class Details extends Component {
  static propTypes = {
    // from parent component
    id: PropTypes.number.isRequired,
    getItem: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    item: PropTypes.object,
    render: PropTypes.func.isRequired,
    editRoute: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.handleRetry = this.handleRetry.bind(this)
    this.handleFab = this.handleFab.bind(this)
  }

  componentDidMount() {
    if (!this.props.item || this.props.item.id !== this.props.id) {
      this.props.getItem(this.props.id)
    }
  }

  handleRetry() {
    this.props.getItem(this.props.id)
  }

  handleFab() {
    const route = this.props.editRoute
    route.edit = this.props.item
    router.push(route)
  }

  render() {
    const {loading, error, item, editRoute} = this.props

    if (error) {
      return (
        <View style={styles.empty}>
          <FormattedMessage id={'error.' + error} style={styles.error} />
          {
            error !== 'not_found' && (
              <Button id="retry" onPress={this.handleRetry} />
            )
          }
        </View>
      )
    }

    if (loading || !item) { //TODO: separate cases or remove loading check?
      return (
        <View style={styles.empty}>
          <Spinner visible={true} />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        {this.props.render(item)}
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
    paddingTop: 4,
    backgroundColor: 'white',
    flex: 1,
  },
})

export default Details
