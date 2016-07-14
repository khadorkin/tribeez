import React, {Component, PropTypes} from 'react'
import {ActivityIndicator, StyleSheet, View, Image} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Button from '../components/Button'

import routes from '../../common/routes'
import router from '../../common/router'

import colors from '../../common/constants/colors'
import autoLogin from '../../common/actions/autoLogin'

class Welcome extends Component {
  static propTypes = {
    // redux state
    loading: PropTypes.bool.isRequired,
    // action creators:
    autoLogin: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.autoLogin()
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
              <ActivityIndicator size="large" color={colors.main} />
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
    width: 128,
    height: 128,
  },
})

const mapStateToProps = (state) => ({
  loading: state.app.loading > 0,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  autoLogin,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
