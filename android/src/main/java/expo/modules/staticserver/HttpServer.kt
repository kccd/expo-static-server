package expo.modules.staticserver

import fi.iki.elonen.NanoHTTPD
import java.io.File
import java.io.FileInputStream
import java.io.IOException


class HttpServer(private val host: String, private val port: Int, private val staticDirectory: String) : NanoHTTPD(host, port) {

    private fun successResponse(file: File): Response  {
        val mimeType = if (file.extension in listOf("html", "htm")) {
            "text/html"
        } else {
            NanoHTTPD.getMimeTypeForFile(file.name)
        }
        val inputStream = FileInputStream(file)
        return NanoHTTPD.newFixedLengthResponse(Response.Status.OK, mimeType, inputStream, file.length())
    }

    private fun notFoundResponse(): Response {
        return NanoHTTPD.newFixedLengthResponse(Response.Status.NOT_FOUND, NanoHTTPD.MIME_PLAINTEXT, "File not found")
    }

    private fun internalErrorResponse(e: IOException): Response {
        return NanoHTTPD.newFixedLengthResponse(Response.Status.INTERNAL_ERROR, NanoHTTPD.MIME_PLAINTEXT, "Error serving the file" + e.message)
    }

    override fun serve(session: IHTTPSession): Response {
        try {
            val uri = session.uri
            var targetFile: File? = null
            val file = File(staticDirectory, uri)


            if(file.exists()) {
                if(file.isFile) {
                    targetFile = file
                } else {
                    val indexFile = File(file, "index.html")
                    if(indexFile.exists()) {
                        targetFile = indexFile
                    }
                }
            } else {
                // Try common file extensions
                val commonExtensions = listOf(".html", ".htm")
                for (extension in commonExtensions) {
                    val fileWithExtension = File(staticDirectory, "$uri$extension")
                    if (fileWithExtension.exists() && fileWithExtension.isFile) {
                        targetFile = fileWithExtension
                        break
                    }
                }
            }

            return if(targetFile == null) {
                this.notFoundResponse()
            } else {
                this.successResponse(targetFile)
            }

        } catch (e: IOException) {
            return this.internalErrorResponse(e)
        }
    }
}