import * as dotenv from "dotenv"
dotenv.config()
import Fastify from "fastify"
import fastifySensible from "@fastify/sensible"
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"

import { startWorker } from "./worker"

const PORT = process.env["PORT"] ?? 3001
const fastify = Fastify()
fastify.register(fastifySensible)
fastify.withTypeProvider<TypeBoxTypeProvider>()

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
startWorker()
