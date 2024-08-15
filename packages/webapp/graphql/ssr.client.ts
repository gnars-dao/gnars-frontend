import { GraphQLClient } from 'graphql-request';

// this hits the graphql api exposed in the pages/api/graphql.ts file
export const graphQLClient = new GraphQLClient(process.env.ROOT_URI as string);
