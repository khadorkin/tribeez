import React, {Component, PropTypes} from 'react'
import {ActivityIndicator, StyleSheet, View, Text, Linking} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import ScrollView from '../hoc/ScrollView'
import FormattedMessage from '../components/FormattedMessage'
//import FormattedDate from '../components/FormattedDate'
import FormattedNumber from '../components/FormattedNumber'
import IconButton from '../components/IconButton'
import Log from '../components/Log'

import listenItem from '../../common/actions/listenItem'

import colors from '../../common/constants/colors'

class Details extends Component {
  static propTypes = {
    // from parent component
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    mapper: PropTypes.func.isRequired,
    renderBody: PropTypes.func,
    // from redux:
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    item: PropTypes.object,
    userMap: PropTypes.object.isRequired,
    uid: PropTypes.string,
    // action creators:
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleFocus = this.handleFocus.bind(this)
  }

  componentDidMount() {
    this.props.subscribe(this.props.type, this.props.id)
  }

  componentWillUnmount() {
    this.props.unsubscribe()
  }

  handlePress(url) {
    Linking.openURL(url)
  }

  handleFocus() {
    const input = this.refs.log.getWrappedInstance().refs.box.getWrappedInstance().refs.input
    this.refs.sv.scrollFocus(input, 100)
  }

  render() {
    const {type, loading, error, userMap, uid, item, mapper, renderBody} = this.props

    let content
    let body
    let log

    if (item) {
      content = mapper(item, userMap)
        .filter((info) => (item[info.id] || info.id === 'done'))
        .map((info, index) => {
          const style = {
            color: colors.primaryText,
            fontSize: (index === 0) ? 20 : 16,
          }

          let element
          if (info.message) {
            element = <FormattedMessage style={style} id={info.message} values={info.values} />
          } else if (info.money) {
            element = <FormattedNumber style={style} value={info.money} format="money" />
          } else {
            element = <Text style={style}>{info.text}</Text>
          }

          const onPress = info.url && this.handlePress.bind(this, info.url)

          return (
            <IconButton key={info.id}
              name={info.icon}
              color={colors[type + 's']}
              separator={true}
              onPress={onPress}
              style={styles.button}
            >
              {element}
            </IconButton>
          )
        })

      if (renderBody) {
        body = renderBody(item, userMap, uid)
      }

      log = <Log type={type} item={item} ref="log" onFocus={this.handleFocus} />
    } else {
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
    }

    return (
      <ScrollView ref="sv">
        {content}
        {body}
        {log}
      </ScrollView>
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
  button: {
    paddingHorizontal: 16,
  },
})

const mapStateToProps = (state, props) => ({
  loading: state.app.loading > 0,
  error: state.item.error,
  item: state.item[props.type],
  userMap: state.tribe.userMap,
  uid: state.user.uid,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  subscribe: listenItem.on,
  unsubscribe: listenItem.off,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Details)
