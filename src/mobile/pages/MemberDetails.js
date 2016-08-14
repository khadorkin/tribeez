import React, {Component, PropTypes} from 'react'
import {Text, Linking, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import ScrollView from '../hoc/ScrollView'
import FormattedMessage from '../components/FormattedMessage'
import FormattedDate from '../components/FormattedDate'
import IconButton from '../components/IconButton'
import Avatar from '../components/Avatar'

import colors from '../../common/constants/colors'
import listenMember from '../../common/actions/listenMember'

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

    const infos = [
      {
        id: 'joined',
        icon: 'schedule',
        element: <FormattedMessage id="member_since" values={{when: user.joined}} style={styles.text} />,
      },
      {
        id: 'email',
        icon: 'email',
        handlePress: this.handlePress.bind(this, 'mailto:' + user.email),
        element: <Text style={styles.text}>{user.email}</Text>,
      },
      {
        id: 'phone',
        icon: 'call',
        handlePress: this.handlePress.bind(this, 'tel:' + user.phone),
        element: <Text style={styles.text}>{user.phone}</Text>,
      },
      {
        id: 'birthdate',
        icon: 'cake',
        element: <FormattedDate value={user.birthdate} options={{day: 'numeric', month: 'long', year: 'numeric'}} style={styles.text} />,
      },
    ]

    return (
      <ScrollView>
        <Avatar user={user} size={160} style={styles.avatar} />
        {
          infos
            .filter((info) => user[info.id])
            .map((info) => (
              <IconButton key={info.id}
                name={info.icon}
                color={colors.members}
                separator={true}
                onPress={info.handlePress}
                style={styles.button}
              >
                {info.element}
              </IconButton>
            ))
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  avatar: {
    alignSelf: 'center',
    margin: 32,
  },
  text: {
    color: colors.primaryText,
    fontSize: 16,
  },
  button: {
    paddingHorizontal: 16,
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
