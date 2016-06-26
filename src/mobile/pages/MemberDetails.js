import React, {Component, PropTypes} from 'react'
import {View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet} from 'react-native'

import {connect} from 'react-redux'

import Icon from 'react-native-vector-icons/MaterialIcons'

import FormattedDate from '../components/FormattedDate'

import colors from '../../common/constants/colors'

const infos = [
  {id: 'email', icon: 'email', href: 'mailto:'},
  {id: 'phone', icon: 'call', href: 'tel:'},
  {id: 'birthdate', icon: 'cake'},
]

class MemberDetails extends Component {
  static propTypes = {
    // from parent:
    id: PropTypes.number.isRequired,
    // from redux:
    user: PropTypes.object.isRequired,
  }

  handlePress(url) {
    Linking.openURL(url)
  }

  render() {
    const {user} = this.props

    //TODO: UI

    return (
      <View style={styles.container}>
        <ScrollView>
          {
            infos
              .filter((info) => user[info.id])
              .map((info) => {
                const value = user[info.id]

                const handlePress = info.href && this.handlePress.bind(this, info.href + value)

                let element
                if (info.id === 'birthdate') {
                  element = <FormattedDate value={value} options={{day: 'numeric', month: 'long', year: 'numeric'}} /*day="numeric" month="long"*/ />
                } else {
                  element = <Text>{value}</Text>
                }

                return (
                  <TouchableOpacity onPress={handlePress} style={styles.info} key={info.id}>
                    <Icon name={info.icon} color={colors.icon} size={24} style={styles.icon} />
                    {element}
                  </TouchableOpacity>
                )
              })
          }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    backgroundColor: 'white',
    flex: 1,
  },
  info: {
    flexDirection: 'row',
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
})

const mapStateToProps = (state, ownProps) => ({
  user: state.member.tribe.userMap[ownProps.id],
})

export default connect(mapStateToProps)(MemberDetails)
