[![Dependencies](https://img.shields.io/david/antoinerousseau/mytribe.svg)](https://david-dm.org/antoinerousseau/mytribe#info=dependencies&view=list)
[![DevDependencies](https://img.shields.io/david/dev/antoinerousseau/mytribe.svg)](https://david-dm.org/antoinerousseau/mytribe#info=devDependencies&view=list)

# MyTribe app

    npm install

## API

You need to install and start the API first: https://bitbucket.org/antoinerousseau/mytribe-api

## Config

    cp config.dist.json config.development.json
    cp config.dist.json config.production.json

Then edit `config.development.json` and `config.production.json` with your infos

## Web app

### Development

    npm run dev
    npm run start

Then go to [http://localhost:3001](http://localhost:3001/)

### Production

Build:

    npm run deploy

Serve with [nginx](http://nginx.org/):

```
server {
    server_name tribeez.net;
    root /home/antoine/apps/mytribe-app;
    #access_log off;

    location / {
        try_files /dist/$uri /dist/index.html =404;
    }
}
```

Serve with [PM2](http://pm2.keymetrics.io/):

    PORT=3011 NODE_ENV=production pm2 start server.js --name "mytribe-app" -- --color

## Android app

Create `android/app/fabric.properties` like this to configure Crashlytics & Answers:

```
apiSecret=xxxxxxxx
apiKey=xxxxxxxx
```

These values can be found in your [Organization settings](https://fabric.io/settings/organizations)

### Development

Install the React Native Cli:

    npm install -g react-native-cli

Connect a device or start an emulator, then run:

    react-native run-android

You can see the logs by launching:

```
adb logcat *:S ReactNative:V ReactNativeJS:V
```

### Production

Generate a key:

    cd android/app
    keytool -genkey -keystore android.keystore -alias android -keyalg RSA -keysize 2048 -validity 10000

Edit `~/.gradle/gradle.properties`:

```
MYTRIBE_RELEASE_STORE_FILE=android.keystore
MYTRIBE_RELEASE_KEY_ALIAS=android
MYTRIBE_RELEASE_STORE_PASSWORD=xxxxxxxx
MYTRIBE_RELEASE_KEY_PASSWORD=xxxxxxxx
```

Bump version:

* Edit `versionCode` and `versionName` in `android/app/build.gradle`

Generate production builds:

    npm run android

The generated package can be found at `android/app/build/outputs/apk/app-release.apk`
