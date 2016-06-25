import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Image} from 'react-native'

import {connect} from 'react-redux'

import Spinner from '../components/Spinner'
import Button from '../components/Button'

import routes from '../../common/routes'
import router from '../../common/router'

import colors from '../../common/constants/colors'

class Welcome extends Component {
  static propTypes = {
    // redux state
    loading: PropTypes.bool.isRequired,
  }

  handleLogin() {
    router.push(routes.LOGIN)
  }

  handleRegister() {
    router.push(routes.REGISTER)
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../common/images/logo.png')} style={styles.logo} />
        {
          this.props.loading ? (
            <View style={styles.actions}>
              <Spinner visible={true} />
            </View>
          ) : (
            <View style={styles.actions}>
              <Button id="login" onPress={this.handleLogin} />
              <Button id="register" onPress={this.handleRegister} />
            </View>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  actions: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  logo: {
    width: 138.5,
    height: 143.5,
  },
})

const mapStateToProps = (state) => ({
  loading: state.member.loading,
})

export default connect(mapStateToProps)(Welcome)
