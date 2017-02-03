'use strict';

const { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');
const dbUsers = require('./data/users');

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    login: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
});

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        }
      },
      users: {
        type: new GraphQLList(userType),
        args: {
          id: {
            description: 'id of the user',
            type: GraphQLInt
          }
        },
        resolve(parent, args) {
          if (args.id) {
            return [dbUsers[args.id]];
          }
          return dbUsers;
        }
      },
    }
  })
});
