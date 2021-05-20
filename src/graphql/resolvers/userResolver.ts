import { IResolvers } from 'graphql-tools';

import { AuthenticateResponse, User } from '../generated';
import { IMessage } from '../../types/message';

const userResolvers: IResolvers = {
  Mutation: {
    register: async (): Promise<AuthenticateResponse> => ({
      token: 'token',
    }),
  },

  Query: {
    login: async (): Promise<AuthenticateResponse> => ({
      token: 'token',
    }),

    me: (_parent, _args, { me }): User => ({
      ...me,
    }),
  },

  User: {
    messages: (user, _args, { models: { messages } }): { id: string; text: string; userId: string }[] =>
      messages.filter((message: IMessage) => message.userId === user.id),
  },
};

export default userResolvers;
