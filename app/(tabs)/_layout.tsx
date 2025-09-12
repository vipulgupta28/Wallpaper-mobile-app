import { View, Text, Pressable, StyleSheet } from "react-native";
import { Link, Slot } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <View style={styles.container}>
      {/* Main page content */}
      <View style={styles.content}>
        <Slot />
      </View>

      {/* Floating Bottom Navigation Bar */}
      <View style={styles.navWrapper}>
        <View style={styles.navBar}>
          <Link href="/" asChild>
            <Pressable style={styles.navItem}>
              <Ionicons name="home-outline" size={22} color="#fff" />
              <Text style={styles.navText}>For you</Text>
            </Pressable>
          </Link>

          <Link href="/explore" asChild>
            <Pressable style={styles.navItem}>
              <Ionicons name="search-outline" size={22} color="#fff" />
              <Text style={styles.navText}>Explore</Text>
            </Pressable>
          </Link>

          <Link href="/account" asChild>
            <Pressable style={styles.navItem}>
              <Ionicons name="person-outline" size={22} color="#fff" />
              <Text style={styles.navText}>Account</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
    marginTop:40,
  },
  navWrapper: {
    position: "absolute",
   
    bottom: 20, // 👈 floating above bottom
    left: 20,
    right: 20,
    alignItems: "center",
  },
  navBar: {
    
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#111", // dark floating background
    borderRadius: 50, // 👈 full rounded pill shape
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10, // 👈 shadow for Android
    width: "90%", // 👈 not full width, floating style
  },
  navItem: {
    alignItems: "center",
    flex: 1,
  },
  navText: {
    fontSize: 12,
    color: "#fff",
    marginTop: 4,
    fontFamily: "Poppins-Medium",
  },
});
