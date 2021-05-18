import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());

const schema = gql`
  type Query {
    me: User
  }

  type User {
    username: String!
  }
`;

const resolvers = {
  Query: {
    me: () => ({
      username: 'Bart Brusselmans',
    }),
  },
};

const server = new ApolloServer({
  resolvers,
  typeDefs: schema,
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: process.env.PORT }, () => {
  // eslint-disable-next-line no-console
  console.log(`Apollo Server on http://localhost:${process.env.PORT}/graphql`);
});
