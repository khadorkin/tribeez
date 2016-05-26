[![Dependencies](https://img.shields.io/david/antoinerousseau/mytribe.svg)](https://david-dm.org/antoinerousseau/mytribe#info=dependencies&view=list)
[![DevDependencies](https://img.shields.io/david/dev/antoinerousseau/mytribe.svg)](https://david-dm.org/antoinerousseau/mytribe#info=devDependencies&view=list)

# MyTribe app

    npm install

## API

You need to install and start the API first: https://bitbucket.org/antoinerousseau/mytribe-api

## Config

    cp config.dist.json config.json

Then edit `config.json` with your infos

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

## Mobile app

Connect a device or start an emulator, then run:

    npm run mobile

Or [manually](https://facebook.github.io/react-native/docs/getting-started.html):

    npm install -g react-native-cli
    react-native run-android
