[![Dependencies](https://img.shields.io/david/antoinerousseau/tribeez.svg)](https://david-dm.org/antoinerousseau/tribeez#info=dependencies&view=list)
[![DevDependencies](https://img.shields.io/david/dev/antoinerousseau/tribeez.svg)](https://david-dm.org/antoinerousseau/tribeez#info=devDependencies&view=list)

# Tribeez

## Prerequisite

You need to install and start the [API](https://bitbucket.org/antoinerousseau/tribeez-api) first:

## Dependencies

    npm install
    npm install -g firebase-tools

## Config

    cp config.dist.json config.development.json
    cp config.dist.json config.production.json

Then edit `config.development.json` and `config.production.json` with your infos

## Web app

### Development

    npm run dev
    npm run serve

Then go to [localhost:5000](http://localhost:5000/)

### Production

Build:

    npm run deploy

Serve with [Firebase Hosting](https://firebase.google.com/docs/hosting/):

    firebase login
    firebase deploy

Serve with [nginx](http://nginx.org/):

```
server {
    server_name tribeez.net www.tribeez.net;
    root /home/<user>/apps/tribeez;
    #access_log off;

    location / {
        try_files /dist/$uri /dist/index.html =404;
    }
}
```

## Android app

### Development

Install the React Native Cli:

    npm install -g react-native-cli

Connect a device or start an emulator, then run:

    react-native run-android

You can see the logs by running:

    react-native log-android

### Production

Generate a key:

    cd android/app
    keytool -genkey -keystore android.keystore -alias android -keyalg RSA -keysize 2048 -validity 10000

Edit `~/.gradle/gradle.properties`:

```
TRIBEEZ_RELEASE_STORE_FILE=android.keystore
TRIBEEZ_RELEASE_KEY_ALIAS=android
TRIBEEZ_RELEASE_STORE_PASSWORD=xxxxxxxx
TRIBEEZ_RELEASE_KEY_PASSWORD=xxxxxxxx
```

Bump version:

* Edit `versionCode` and `versionName` in `android/app/build.gradle` and in `src/common/config.js`

Generate production builds:

    npm run android

The generated package can be found at `android/app/build/outputs/apk/app-release.apk`
