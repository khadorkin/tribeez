# MyTribe app

    npm install

## API

You need to install and start the API first: https://bitbucket.org/antoinerousseau/mytribe-api

## Development

    npm run dev
    npm run start

Then go to [http://localhost:3001](http://localhost:3001/)

## Production

    npm run deploy
    npm install -g pm2
    PORT=3001 pm2 start server.js --name "mytribe-app" -- --color
