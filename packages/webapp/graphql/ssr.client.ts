import { GraphQLClient } from 'graphql-request';

import { env } from '@env/server';

// this hits the graphql api exposed in the /app/graphql.ts file
export const graphQLClient = new GraphQLClient(env.ROOT_URI);
