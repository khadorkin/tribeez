import {AsyncStorage} from 'react-native'

export default {
  get: AsyncStorage.getItem,
  set: AsyncStorage.setItem,
}
