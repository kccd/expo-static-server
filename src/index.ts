import * as FileSystem from "expo-file-system";

import ExpoStaticServerModule from "./ExpoStaticServerModule";

export async function startServer(props: {
  port: number;
  host: string;
  root: string;
}) {
  const port = props.port;
  if (isNaN(port) || port < 0 || port > 65535) {
    throw new Error(
      "ExpoStaticServerModule port number must be in the range 0-65535",
    );
  }
  let root = props.root;
  if (!root) {
    throw new Error("ExpoStaticServerModule requires root path");
  }
  const prefix = "file://";
  if (root.startsWith(prefix)) {
    root = root.slice(prefix.length);
  }
  return (await ExpoStaticServerModule.startServer(
    props.host,
    port,
    root,
  )) as string;
}

export async function stopServer() {
  return (await ExpoStaticServerModule.stopServer()) as string;
}

export async function startFileServerByFiles(props: {
  port: number;
  host: number;
  files: { uri: string; name: string; type: string }[];
}) {
  const { port, host, files } = props;
  const root = FileSystem.documentDirectory + "expo_static_server_root_files";
  for (const file of files) {
    const fileName = `${file.name}${file.type ? "." + file.type : ""}`;
    await FileSystem.copyAsync({
      from: fileUri,
      to: root + "/" + fileName,
    });
  }
  await startServer({
    port,
    host,
    root,
  });
}

export async function startFileServerByZipFileUri(props: {
  port: number;
  host: number;
  zipFileUri: string;
}) {
  const { port, host, zipFileUri } = props;
  const root =
    FileSystem.documentDirectory + "expo_static_server_root_zip_files";
  await unzip(zipFileUri, webRootPath);
  await startServer({
    port,
    host,
    root,
  });
}
