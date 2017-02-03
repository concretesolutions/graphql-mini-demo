'use strict';

const { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');
const dbUsers = require('./data/users');
const dbPosts = require('./data/posts');

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: () => {
    return {
      text: {
        type: new GraphQLNonNull(GraphQLString)
      },
      likers: {
        type: new GraphQLList(userType),
        resolve(parent) {
          return dbUsers.filter(user => {
            return user.likes.indexOf(parent.id) !== -1;
          });
        }
      }
    };
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
        resolve(parent, args, request) {
          return request.user ? request.user.login : 'stranger';
        }
      },

      myPosts: {
        type: new GraphQLList(postType),
        resolve(parent, args, request) {
          if (!request.user) {
            throw new Error('Must be logged in');
          }
          return dbPosts.filter(post => {
            return post.author === request.user.id;
          });
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
  }),

  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      updatePassword: {
        type: GraphQLString,
        args: {
          password: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (parent, args, context) => {
          return 'FAKE RESPONSE';
        }
      }
    }
  })
});
