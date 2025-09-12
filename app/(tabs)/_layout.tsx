import { View, Text, Pressable, StyleSheet } from "react-native";
import { Link, Slot } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Expo ships with Ionicons

export default function Layout() {
  return (
    <View style={styles.container}>
      {/* Main page content */}
      <View style={styles.content}>
        <Slot />
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        <Link href="/" asChild>
          <Pressable style={styles.navItem}>
            <Ionicons name="home-outline" size={24} color="#fff" />
            <Text style={styles.navText}>For you</Text>
          </Pressable>
        </Link>

        <Link href="/explore" asChild>
          <Pressable style={styles.navItem}>
            <Ionicons name="search-outline" size={24} color="#fff" />
            <Text style={styles.navText}>Explore</Text>
          </Pressable>
        </Link>

        <Link href="/account" asChild>
          <Pressable style={styles.navItem}>
            <Ionicons name="person-outline" size={24} color="#fff" />
            <Text style={styles.navText}>Account</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop:0,
  },
  content: {
    flex: 1,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    

    backgroundColor: "black",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#fff",
    marginTop: 4,
  },
});


// download wallpaper
// like suggested and library separation