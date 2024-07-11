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
