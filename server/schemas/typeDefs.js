const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    type Book {
        id: ID!
        author: [String]
        description: String
        title: String
        bookId: String
        image: [String]
        link: String
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        user(username: String!): User
        # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
        me: User
    }
    input MediaDetails {
        format: MediaFormat!
        url: String!
    }
    enum MediaFormat {
        IMAGE
        VIDEO
    }
    input BookContent {
        author: [String]
        description: String
        title: String
        bookId: String
        image: [MediaDetails]
        link: String
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(content: BookContent!): User
        removeBook(id: ID!): User
    }
`;

module.exports = typeDefs;