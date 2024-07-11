expo-static-server
----
This library currently supports only the Android platform.
## Usage
```Typescript
import React, { useEffect } from 'react';
import { stopServer, startServer } from "expo-static-server";
import * as FileSystem from "expo-file-system";

export function TestComponent(props: {
  children: React.ReactNode,
}) {
  useEffect(() => {
    // Start server
    await startServer({
      port: 8080,
      host: "127.0.0.1",
      root: FileSystem.documentDirectory
    });
    console.log(`The static server is running`)
    return () => {
      // Stop server
      await stopServer();
      console.log(`The static server is stoped`)
    }
  }, [])

  return <>{props.children}<>
}
```
If you want to access external storage in your project, you may need to add the following permissions.

Android: `READ_EXTERNAL_STORAGE`, `WRITE_EXTERNAL_STORAGE`
