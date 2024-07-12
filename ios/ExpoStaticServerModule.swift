import ExpoModulesCore
import GCDWebServer

public class ExpoStaticServerModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  private var httpServer: HttpServer?
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoStaticServer')` in JavaScript.
    Name("ExpoStaticServer")

    AsyncFunction("startServer") { (host: String, port: UInt, root: String, promise: Promise) in
        DispatchQueue.main.async {
            do {
                if let server = self.httpServer {
                  server.stop()
                  self.httpServer = nil
                }
                self.httpServer = try HttpServer(host: host, port: port, root: root)
                promise.resolve("ok")
            } catch let error {
                promise.reject("START_SERVER_ERROR", error.localizedDescription)
            }
        }
    }

    AsyncFunction("stopServer") { (promise: Promise) in
        if let server = self.httpServer {
          server.stop()
          self.httpServer = nil
        }
        promise.resolve("ok")
    }
  }
}
