# GraphQL mini-demo

A small GraphQL application in few steps. Each step is available via a git tag.

Install dependencies: `npm install`. Start the application: `npm start`. GraphiQL is available at `http://localhost:8000/graphql`

## 1 - Installation of dependencies and "Hello World"

```bash
git checkout install
```

Installation of `express`, `graphql` and `express-graphql`. Creation of the example GraphQL schema from [`graphql-js`](https://github.com/graphql/graphql-js).

```graphql
query {
  hello
}
```

## 2 - Creation of a list of users

```bash
git checkout list-users
```

A `User` type is created and a `users` field is added to the root query type. It accepts an optional argument allowing to filter on the user ID.

```graphql
query allUsers{
  users {
    login
  }
}

query findUserById{
  users (id: 2) {
    login
  }
}
```

## 3 - Creation of a list of posts for each user

```bash
git checkout user-posts
```

A `Post` type is created and a `posts` field is added to the `User` type.

```graphql
query {
  hello
  users {
    login
    posts {
      text
    }
  }
}
```

## 4 - Creation of a circular dependency

```bash
git checkout cicular-dep
```

A "likes" field is added on the `User` type. It contains a list of `Post`.

```graphql
query {
  users {
    login
    posts {
      likers {
        posts {
          likers {
            posts {
              likers {
                login
              }
            }
          }
        }
      }
    }
  }
}
```

It is possible to create a lot of load for the server in a single query.

https://news.ycombinator.com/item?id=10219785

http://stackoverflow.com/questions/37337466/how-do-you-prevent-nested-attack-on-graphql-apollo-server/37338465

## 5 - Authorization

```bash
git checkout session
```

Simulation of an authentication middleware. The field `hello` now contains the name of the user and the field `myPosts` contains the list of the user's posts.

```graphql
query {
  hello
  myPosts {
    text
  }
}
```

## 6 - Mutation

```bash
git checkout mutation
```

Creation of a mocked mutation.

```graphql
mutation {
  updatePassword(password: "my-secure-password")
}
```

## Other queries to test

```graphql
query everything {
  hello
  myPosts { text }
  users {
    login
    posts {
      text
    }
  }
}

query usingFragment {
  users {
    ...completeUser
  }
}

query usingFragmentAndAlias {
  monica: users(id: 1) {
    ...completeUser
  }
  cascao: users(id: 3) {
    ...completeUser
  }
}

fragment completeUser on User {
  login
  posts {
    text
  }
}

mutation updpwd {
  updatePassword(password: "my-secure-password")
}
```
