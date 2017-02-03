'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');

const MyGraphQLSchema = require('./schema');
const app = express();

app.use((request, response, next) => {
  request.user = { id: 1, login: 'Mônica' };
  next();
});

app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true
}));

app.listen(8000);
