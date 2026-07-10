import { createCoreApp } from './app.js'

const { app, config } = await createCoreApp()
await app.listen({ host: config.host, port: config.port })
console.log(`FreeWebPanel Core API listening on http://${config.host}:${config.port}`)
