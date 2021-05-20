import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { resolvers, typeDefs } from './graphql';
import users from './models/users';
import messages from './models/messages';

dotenv.config();

const app = express();

app.use(cors());

const me = {
  id: '1',
  messageIds: ['1'],
  username: 'Bart Brusselmans',
};

const server = new ApolloServer({
  context: {
    me,
    models: {
      messages,
      users,
    },
  },
  resolvers,
  typeDefs,
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: process.env.PORT }, () => {
  // eslint-disable-next-line no-console
  console.log(`Apollo Server on http://localhost:${process.env.PORT}/graphql`);
});
