import { IResolvers } from 'graphql-tools';
import { v4 as uuidv4 } from 'uuid';
import messages from '../../models/messages';
import users from '../../models/users';
import { IMessage } from '../../types/message';

import {
  QueryMessageArgs,
  MutationCreateMessageArgs,
  MutationDeleteMessageArgs,
  MutationUpdateMessageArgs,
  User,
  Message,
} from '../generated';

const messageResolvers: IResolvers = {
  Message: {
    user: (message): User | undefined => users.find((user) => user.id === message.userId),
  },

  Mutation: {
    createMessage: (_parent, { text }: MutationCreateMessageArgs, { me }): IMessage => {
      const id = uuidv4();
      const message = {
        id,
        text,
        userId: me.id,
      };

      messages.push(message);
      const currentUser = users.find((user) => user.id === me.id);
      currentUser?.messageIds?.push(id);

      return message;
    },
    deleteMessage: (_parent, { id }: MutationDeleteMessageArgs): boolean => {
      const messageToDelete = messages.findIndex((message) => message.id === id);

      if (!messageToDelete) {
        return false;
      }

      messages.splice(messageToDelete, 1);

      return true;
    },
    updateMessage: (
      _parent,
      { id, input: { text } }: MutationUpdateMessageArgs,
      { me },
    ): { success: boolean; message?: Message | undefined } => {
      const messageToUpdate = messages.findIndex((message) => message.id === id);

      if (!messageToUpdate) {
        return { success: false };
      }

      messages[messageToUpdate].text = text || '';

      return {
        message: {
          id: messages[messageToUpdate].id,
          text: messages[messageToUpdate].text,
          user: me,
        },
        success: true,
      };
    },
  },

  Query: {
    message: (_parent: void, { id }: QueryMessageArgs): { id: string; text: string; userId: string } | undefined =>
      messages.find((message) => message.id === id),

    messages: (): { id: string; text: string; userId: string }[] => messages,
  },
};

export default messageResolvers;
