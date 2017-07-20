import express from 'express';
import GraphHTTP from 'express-graphql';
import Schema from './Schema';

var cors = require('express-cors');

//Config
const APP_PORT = 3001;

const app = express();

app.use(cors({
  allowedOrigins: ['localhost:3000']
}));

app.use('/graphql', GraphHTTP({
    schema: Schema,
    pretty: true,
    graphiql: true
}));

app.listen(APP_PORT, () => {
    console.log( `APP listening on port ${APP_PORT}` );
});
