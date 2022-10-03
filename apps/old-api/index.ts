import { stringify } from "@softstack/typed-stringify"
import bodyParser from "body-parser"
import cors from "cors"
import express, { NextFunction, Request, Response } from "express"
import helmet from "helmet"
import http from "http"
import mongoose from "mongoose"
import { WebSocketServer } from "ws"
import { MONGO_DB, PORT } from "./constants/env"
import { observe } from "./observe"
import { routes } from "./routes"
import { ExtWebSocket } from "./types"
import { errorToString } from "./utils"

const main = async () => {
  const app = express()
  const server = http.createServer(app)
  const wss = new WebSocketServer({ server, path: "/api/webSocket" })

  wss.on("connection", (ws) => {
    const extWs = ws as ExtWebSocket
    extWs.isAlive = true
    ws.on("pong", () => (extWs.isAlive = true))
  })

  const interval = setInterval(() => {
    wss.clients.forEach((ws) => {
      const extWs = ws as ExtWebSocket
      if (extWs.isAlive === false) {
        extWs.terminate()
        return
      }
      extWs.isAlive = false
      extWs.ping()
    })
  }, 1000 * 60)

  wss.on("close", () => {
    clearInterval(interval)
  })

  //Set up default mongoose connection
  await mongoose.connect(MONGO_DB)
  console.log("MongodDB successfully connected...")

  //Get the default connection
  const db = mongoose.connection

  //Bind connection to error event (to get notification of connection errors)
  db.on("error", console.error.bind(console, "MongoDB connection error:"))

  app.use(helmet())
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use("/api", routes)

  app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    return res.status(500).send(stringify({ error: errorToString(error) }))
  })

  server.listen(PORT, async () => {
    console.log(`Server is started at ${PORT}`)
    console.log(wss.address())
    await observe(wss)
  })
}

main()
