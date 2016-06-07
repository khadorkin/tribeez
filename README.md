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

### Development

Install the React Native Cli:

    npm install -g react-native-cli

Connect a device or start an emulator, then run:

    react-native run-android

You can see the logs by launching:

    adb logcat *:S ReactNative:V ReactNativeJS:V

### Production

Make sure you have a keystore and its infos in `~/.gradle/gradle.properties` as [described in the doc](https://facebook.github.io/react-native/docs/signed-apk-android.html), then run:

    cd android && ./gradlew assembleRelease

The generated package can be found at `android/app/build/outputs/apk/app-release.apk`
