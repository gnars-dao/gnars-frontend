import * as dotenv from "dotenv"
dotenv.config()
import Fastify from "fastify"
import fastifySensible from "@fastify/sensible"
import cors from "@fastify/cors"
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import { Static, Type } from "@sinclair/typebox"

import { startWorker } from "./worker"
import { prisma } from "./constants"

const PORT = process.env["PORT"] ?? 3003
const fastify = Fastify()
fastify.register(fastifySensible)
fastify.register(cors)
fastify.withTypeProvider<TypeBoxTypeProvider>()

const GnarIdParams = Type.Object({
  gnarId: Type.Integer(),
})

type GnarIdParamsType = Static<typeof GnarIdParams>

fastify.get("/ping", async (req, rep) => {
  rep.send({ pong: true })
})

fastify.get<{ Params: GnarIdParamsType }>(
  "/bids/:gnarId",
  { schema: { params: GnarIdParams } },
  async (req, rep) => {
    const { gnarId } = req.params
    const res = await prisma.bid.findMany({
      where: { gnarId: gnarId },
      select: {
        sender: true,
        amount: true,
        timestamp: true,
        transactionHash: true,
      },
      orderBy: [{ timestamp: "desc" }],
    })

    if (!res) return rep.send(null)
    return rep.send(res)
  }
)

fastify.get<{ Params: GnarIdParamsType }>(
  "/winner/:gnarId",
  { schema: { params: GnarIdParams } },
  async (req, rep) => {
    const { gnarId } = req.params
    const res = await prisma.winner.findUnique({
      where: { gnarId: gnarId },
      select: {
        sender: true,
        amount: true,
        timestamp: true,
      },
    })

    if (!res) return rep.send(null)
    return rep.send(res)
  }
)

fastify.get<{ Params: GnarIdParamsType }>(
  "/gnar/:gnarId",
  { schema: { params: GnarIdParams } },
  async (req, rep) => {
    const { gnarId } = req.params

    const res = await prisma.gnar.findUnique({
      where: { gnarId: gnarId },
      select: {
        startTimestamp: true,
        endTimestamp: true,
        bids: {
          select: {
            sender: true,
            amount: true,
            timestamp: true,
            transactionHash: true,
          },
          orderBy: [{ timestamp: "desc" }],
        },
        winner: {
          select: {
            amount: true,
            sender: true,
          },
        },
      },
    })

    const nextGnarRes = await prisma.gnar.findUnique({
      where: { gnarId: gnarId + 1 },
      select: { gnarId: true },
    })

    const isLatestGnar = !nextGnarRes

    if (!res) return rep.send(null)
    return rep.send({ ...res, isLatestGnar })
  }
)

fastify.get("/latest-gnar", async (req, rep) => {
  const res = await prisma.gnar.findFirst({
    orderBy: { gnarId: "desc" },
    select: {
      gnarId: true,
      startTimestamp: true,
      endTimestamp: true,
      bids: {
        select: {
          sender: true,
          amount: true,
          timestamp: true,
          transactionHash: true,
        },
        orderBy: [{ timestamp: "desc" }],
      },
    },
  })

  if (!res) return rep.send(null)
  return rep.send({ ...res, hasFinished: res.endTimestamp! <= new Date() })
})

const startServer = async () => {
  try {
    await fastify.listen({
      host: "0.0.0.0",
      port: Number(PORT),
    })
    console.log(`Server live at http://0.0.0.0:${PORT}`)
  } catch (err) {
    console.log(err)
    fastify.log.error(err)
    process.exit(1)
  }
}
startServer()

if (process.env["NODE_ENV"] === "production") {
  startWorker()
}
