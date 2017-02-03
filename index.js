'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');

const MyGraphQLSchema = require('./schema');
const app = express();

app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true
}));

app.listen(8000);
