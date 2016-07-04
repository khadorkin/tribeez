import config from './config'
import firebase from 'firebase'

const app = firebase.initializeApp(config.firebase)
export const auth = app.auth()
export const db = app.database()
