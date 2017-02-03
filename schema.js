'use strict';

const { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');
const dbUsers = require('./data/users');
const dbPosts = require('./data/posts');

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    text: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }
});

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    login: {
      type: new GraphQLNonNull(GraphQLString)
    },
    posts: {
      type: new GraphQLList(postType),
      resolve(parent) {
        return dbPosts.filter(post => {
          return post.author === parent.id;
        });
      }
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
            return [dbUsers.find(user => { return user.id === args.id; })];
          }
          return dbUsers;
        }
      },
    }
  })
});
