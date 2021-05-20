import { IResolvers } from 'graphql-tools';
import merge from 'lodash.merge';
import userResolver from './resolvers/userResolver';
import messageResolver from './resolvers/messageResolver';

const resolverMap: IResolvers = merge(messageResolver, userResolver);

export default resolverMap;
