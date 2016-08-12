import React, {Component, PropTypes} from 'react'
import {Image, Text, ScrollView, Linking, StyleSheet, Dimensions} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Icon from 'react-native-vector-icons/MaterialIcons'

import PageView from '../hoc/PageView'
import FormattedMessage from '../components/FormattedMessage'
import FormattedDate from '../components/FormattedDate'
import Touchable from '../components/Touchable'
import IconButton from '../components/IconButton'

import colors from '../../common/constants/colors'
import gravatar from '../../common/utils/gravatar'
import listenMember from '../../common/actions/listenMember'

const {width} = Dimensions.get('window')

const infos = [
  {id: 'joined', icon: 'schedule'},
  {id: 'email', icon: 'email', href: 'mailto:'},
  {id: 'phone', icon: 'call', href: 'tel:'},
  {id: 'birthdate', icon: 'cake'},
]

class MemberDetails extends Component {
  static propTypes = {
    // from parent:
    id: PropTypes.string.isRequired,
    // from redux:
    user: PropTypes.object.isRequired,
    // action creators:
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.subscribe(this.props.id)
  }

  componentWillUnmount() {
    this.props.unsubscribe()
  }

  handlePress(url) {
    Linking.openURL(url)
  }

  render() {
    const {user} = this.props

    //TODO: UI

    return (
      <PageView>
        <ScrollView>
          <Image source={{uri: gravatar(user, 500)}} style={styles.avatar} />
          {
            infos
              .filter((info) => user[info.id])
              .map((info) => {
                const value = user[info.id]

                const handlePress = info.href && this.handlePress.bind(this, info.href + value)

                let element
                if (info.id === 'joined') {
                  element = <FormattedMessage id="member_since" values={{when: value}} style={styles.text} />
                } else if (info.id === 'birthdate') {
                  element = <FormattedDate value={value} options={{day: 'numeric', month: 'long', year: 'numeric'}} style={styles.text} />
                } else {
                  element = <Text style={styles.text}>{value}</Text>
                }

                return (
                  <IconButton key={info.id} name={info.icon} color={colors.members} separator={true} onPress={handlePress}>
                    {element}
                  </IconButton>
                )
              })
          }
        </ScrollView>
      </PageView>
    )
  }
}

const styles = StyleSheet.create({
  avatar: {
    alignSelf: 'center',
    width: (width / 2.5),
    height: (width / 2.5),
    borderRadius: (width / 5),
    margin: 32,
  },
  text: {
    color: colors.primaryText,
    fontSize: 16,
  },
})

const mapStateToProps = (state, ownProps) => ({
  user: state.tribe.userMap[ownProps.id],
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  subscribe: listenMember.on,
  unsubscribe: listenMember.off,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MemberDetails)
