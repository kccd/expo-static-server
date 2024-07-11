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

### startFileServerByFiles
Starts a static server and serves the specified files.
```typescript
type startFileServerByFiles = (props: {
  host: string,
  port: number,
  files: {
    name: string, 
    type: string,
    uri: string,
  }[],
}) => Promise<void>
```

### startFileServerByZipFileUri
Starts a static server and serves files extracted from the specified zip file.
```typescript
type startFileServerByZipFileUri = (props: {
  host: string,
  port: number,
  zipFileUri: string,
}) => Pormise<void> 
```


## Permissions
If you want to access external storage in your project, you may need to add the following permissions:

+ Android: `READ_EXTERNAL_STORAGE`, `WRITE_EXTERNAL_STORAGE`

