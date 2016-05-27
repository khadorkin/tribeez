import React, {Component} from 'react'
import {StyleSheet, View, Image} from 'react-native'

import Button from '../components/Button'

import routes from '../../common/routes'
import router from '../../common/router'

export default class Welcome extends Component {

  handleLogin() {
    router.push(routes.LOGIN)
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../common/images/logo.png')} style={styles.logo} />
        <Button id="login" onPress={this.handleLogin} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    width: 233,
    height: 205,
  },
})
