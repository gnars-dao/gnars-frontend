/**
 * This api route exposes a graphql api that routes requests to the Graph Network.
 * The route is `/api/graphql`.
 */
import { GraphQLClient } from "graphql-request";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const ssrClient = new GraphQLClient(process.env.PRIVATE_GOLDSKY_L1_SUBGRAPH as string);

const GraphqlReqSchema = z.object({
  query: z.string().min(1),
  operationName: z.string().optional().nullable(),
  variables: z.record(z.unknown()).optional().nullable()
});

const ResponseSchema = z.union([z.object({ data: z.unknown() }), z.object({ error: z.unknown() })] as const);
type ResponseSchema = z.infer<typeof ResponseSchema>;

export default async function ethereumGraphHandler(req: NextApiRequest, res: NextApiResponse<ResponseSchema>) {
  const parsedGqlRequest = GraphqlReqSchema.safeParse(req.body);
  if (!parsedGqlRequest.success) {
    return res.status(400).json({ error: parsedGqlRequest.error });
  }
  const gqlRequest = parsedGqlRequest.data;

  const gqlResponse = await ssrClient.request(gqlRequest.query, gqlRequest.variables ?? undefined);

  res.status(200).json({ data: gqlResponse });
}
