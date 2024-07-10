import { StyleSheet, Text, View } from 'react-native';

import * as ExpoStaticServer from 'expo-static-server';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoStaticServer.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
