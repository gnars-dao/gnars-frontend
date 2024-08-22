import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const { PORT, PRIVATE_GRAPH_LAYER_1_API_KEY, PRIVATE_GOLDSKY_BASE_API_URL, ROOT_URI } = process.env;

export const env = createEnv({
  server: {
    PRIVATE_GRAPH_LAYER_1_API_KEY: z.string().min(32).max(32),
    PRIVATE_GOLDSKY_BASE_API_URL: z.string().url(),
    ROOT_URI: z.string().url().default(`http://localhost:${PORT}/api/graphql`),
  },
  runtimeEnv: {
    PRIVATE_GRAPH_LAYER_1_API_KEY: PRIVATE_GRAPH_LAYER_1_API_KEY,
    PRIVATE_GOLDSKY_BASE_API_URL: PRIVATE_GOLDSKY_BASE_API_URL,
    ROOT_URI: ROOT_URI || `http://localhost:${PORT}/api/graphql`,
  },
});