package expo.modules.staticserver

import expo.modules.kotlin.Promise
import expo.modules.kotlin.exception.CodedException
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import fi.iki.elonen.NanoHTTPD
import java.io.IOException

class ExpoStaticServerModule : Module() {
  private lateinit var httpServer: HttpServer

  override fun definition() = ModuleDefinition {
    Name("ExpoStaticServer")

    AsyncFunction("startServer") { host: String, port: Int, root: String, promise: Promise ->

      try{
        if(::httpServer.isInitialized) {
          httpServer.stop()
        }
        httpServer = HttpServer(host, port, root)
        httpServer.start(NanoHTTPD.SOCKET_READ_TIMEOUT, true)
        promise.resolve("ok")
      } catch(e: IOException) {
        promise.reject(CodedException(e))
      }
    }

    AsyncFunction("stopServer") { promise: Promise ->
      try {
        if(::httpServer.isInitialized) {
          httpServer.stop()
        }
        promise.resolve("ok")
      } catch(e: IOException) {
        promise.reject(CodedException(e))
      }
    }
  }
}
