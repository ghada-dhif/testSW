import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Feed from "./components/feed";

export default function App() {
  return (
    <View style={styles.container}>
      {/*<Text>ghada is that you?!</Text>*/}
      <Feed />

      <StatusBar style="auto" />
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
