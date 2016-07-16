import firebase from 'firebase'

import config from '../../android/app/google-services.json'

const app = firebase.initializeApp({
  apiKey: config.client[0].api_key[0].current_key,
  authDomain: config.project_info.project_id + '.firebaseapp.com',
  databaseURL: config.project_info.firebase_url,
  storageBucket: config.project_info.storage_bucket,
})

export const auth = app.auth()
export const db = app.database()
export const timestamp = firebase.database.ServerValue.TIMESTAMP
