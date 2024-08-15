import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export default createEnv({
  server: {
    PRIVATE_GRAPH_LAYER_1_API_KEY: z.string().min(32).max(32),
    PRIVATE_GOLDSKY_L1_SUBGRAPH: z.string().url(),
    ROOT_URI: z.string().url().default('http://localhost:3000/api/graphql'),
  },
  runtimeEnv: {
    PRIVATE_GRAPH_LAYER_1_API_KEY: process.env.PRIVATE_GRAPH_LAYER_1_API_KEY,
    PRIVATE_GOLDSKY_L1_SUBGRAPH: process.env.PRIVATE_GOLDSKY_L1_SUBGRAPH,
    ROOT_URI: process.env.ROOT_URI
  },
});