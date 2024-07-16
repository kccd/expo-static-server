import { useAssets } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { stopServer, startServer } from "expo-static-server";
import { useEffect, useMemo, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [assets] = useAssets(
    [
      require("./assets/index.html"),
      require("./assets/about.html")
    ]
  );
  const serverInfo = useMemo(() => {
    return {
      port: 8080,
      host: "0.0.0.0",
      root: FileSystem.documentDirectory || "",
    };
  }, []);

  const [filesName, setFilesName] = useState<string[]>([]);

  useEffect(() => {
    if (!assets || assets.length === 0) return;
    const htmlFilePath = assets[0].localUri || '';
    const aboutFilePath = assets[1].localUri || '';
    if (!htmlFilePath) return;
    FileSystem.copyAsync({
      from: htmlFilePath,
      to: FileSystem.documentDirectory + "index.html",
    })
      .then(() => {
        return FileSystem.copyAsync({
          from: aboutFilePath,
          to: FileSystem.documentDirectory + "about.html",
        })
      })
      .then(() => {
        return FileSystem.readDirectoryAsync(serverInfo.root);
      })
      .then((res) => {
        setFilesName(res);
      })
      .catch(console.error);
  }, [assets, serverInfo.root]);

  useEffect(() => {
    return () => {
      stopServer().catch(console.error);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
          }}
        >
          Expo Static Server
        </Text>
        <Text>Host: {serverInfo.host}</Text>
        <Text>Port: {serverInfo.port}</Text>
        <Text>Root: {serverInfo.root}</Text>
      </View>

      <View
        style={{
          marginTop: 20,
          padding: 10,
          flex: 1,
          width: "100%",
          backgroundColor: "#eee",
        }}
      >
        <Text>Root files: </Text>
        {filesName.map((filename, index) => {
          return (
            <View key={filename}>
              <Text>
                {index + 1}. {filename}
              </Text>
            </View>
          );
        })}
      </View>

      <View
        style={{
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ marginRight: 10 }}>
          <Button
            title="START"
            onPress={() => {
              startServer(serverInfo)
                .then(() => {
                  console.log(
                    `The static server is running at ${serverInfo.host}:${serverInfo.port}`,
                  );
                  console.log(`The server's root is ${serverInfo.root}`);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          />
        </View>

        <Button
          title="STOP"
          onPress={() => {
            stopServer()
              .then(() => {
                console.log("The static server is stopped");
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
