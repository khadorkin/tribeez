[![Dependencies](https://img.shields.io/david/antoinerousseau/mytribe.svg)](https://david-dm.org/antoinerousseau/mytribe#info=dependencies&view=list)
[![DevDependencies](https://img.shields.io/david/dev/antoinerousseau/mytribe.svg)](https://david-dm.org/antoinerousseau/mytribe#info=devDependencies&view=list)

# MyTribe app

    npm install

## API

You need to install and start the API first: https://bitbucket.org/antoinerousseau/mytribe-api

## Config

    cp config.dist.json config.json

Then edit `config.json` with your infos

## Development

    npm run dev
    npm run start

Then go to [http://localhost:3001](http://localhost:3001/)

## Production

With [PM2](http://pm2.keymetrics.io/):

    npm run deploy
    PORT=3001 pm2 start server.js --name "mytribe-app" -- --color
