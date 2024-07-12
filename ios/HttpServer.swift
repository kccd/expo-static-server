import ExpoModulesCore
import Foundation
import GCDWebServer

class HttpServer {

  private let webServer: GCDWebServer
  private let staticDirectory: String

  init(host: String, port: UInt, root: String) throws {
    self.webServer = GCDWebServer()
    self.staticDirectory = root

    // Add a handler to serve files from the specified root directory
    self.webServer.addGETHandler(forBasePath: "/", directoryPath: staticDirectory, indexFilename: "index.html", cacheAge: 3600, allowRangeRequests: true)

    // Set the server's binding address and port
    self.webServer.start(withPort: port, bonjourName: host)
  }

  func stop() {
    self.webServer.stop()
  }
}
