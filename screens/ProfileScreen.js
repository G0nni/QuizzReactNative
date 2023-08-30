import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

// Screen components
function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={require("../assets/profilePicture.png")}
        />
        <Text style={styles.text}>demo@estiam.com</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2b2d31",
    alignItems: "center",
  },
  header: {
    flexDirection: "column",

    alignItems: "center",
    padding: 20,
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#fff",
    marginBottom: 20,
    backgroundColor: "#fff",
  },
});
export default ProfileScreen;
