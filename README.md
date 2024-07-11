expo-static-server
----
This library currently supports only the Android platform.

## Usage

```Typescript
import * as FileSystem from "expo-file-system";
import { stopServer, startServer } from "expo-static-server";
import React, { useEffect } from "react";

export function TestComponent(props: { children: React.ReactNode }) {
  useEffect(() => {
    // Start server
    startServer({
      port: 8080,
      host: "127.0.0.1",
      root: FileSystem.documentDirectory || "",
    })
      .then(() => {
        console.log(`The static server is running`);
      })
      .catch(console.error);

    return () => {
      // Stop server
      stopServer()
        .then(() => {
          console.log(`The static server is stoped`);
        })
        .catch(console.error);
    };
  }, []);
  return <>{props.children}</>;
}
```

## API 

### startServer
Starts a static server and serves files from the specified root directory.
```typescript
type startServer = (props: {
  host: string,
  port: number,
  root: string,
}) => Promise<void>
```
Example:

Starts a static server and serves the specified files.
```typescript
import * as FileSystem from "expo-file-system";
import { startServer } from "expo-static-server";

export async function startFileServerByFiles(props: {
  port: number;
  host: string;
  files: { uri: string; name: string; type: string }[];
}) {
  const { port, host, files } = props;
  const root =
    (FileSystem.documentDirectory || "") + "expo_static_server_root_files";
  for (const file of files) {
    const fileName = `${file.name}${file.type ? "." + file.type : ""}`;
    await FileSystem.copyAsync({
      from: file.uri,
      to: root + "/" + fileName,
    });
  }
  await startServer({
    port,
    host,
    root,
  });
}


```

Starts a static server and serves files extracted from the specified zip file.

```typescript
import * as FileSystem from "expo-file-system";
import { startServer } from "expo-static-server";
import { unzip } from 'react-native-zip-archive';

export async function startFileServerByZipFileUri(props: {
  port: number;
  host: string;
  zipFileUri: string;
}) {
  const { port, host, zipFileUri } = props;
  const root =
    (FileSystem.documentDirectory || "") + "expo_static_server_root_zip_files";
  await unzip(zipFileUri, root);
  await startServer({
    port,
    host,
    root,
  });
}
```

### stopServer
Stop the static server.
```typescript
type stopServer = () => Promise<void>
```

## Permissions
If you want to access external storage in your project, you may need to add the following permissions:

+ Android: `READ_EXTERNAL_STORAGE`, `WRITE_EXTERNAL_STORAGE`

