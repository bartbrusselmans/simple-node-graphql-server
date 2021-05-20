import 'graphql-import-node';

import * as emptyTypeDefs from './schemas/empty.graphql';
import * as userTypeDefs from './schemas/user.graphql';
import * as messageTypeDefs from './schemas/message.graphql';

const schema = [emptyTypeDefs, messageTypeDefs, userTypeDefs];

export default schema;
