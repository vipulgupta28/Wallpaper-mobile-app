import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Account() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Panels</Text>
      <Text style={styles.subtitle}>Sign in to save your data</Text>

      {/* Sign In Buttons */}
      <View style={styles.buttonGroup}>
      <TouchableOpacity style={styles.signInButton}>
  <Icon name="google" size={20} color="#fff" style={{ marginRight: 8 }} />
  <Text style={styles.signInText}>Sign in with Google</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.signInButton}>
  <Icon name="apple" size={22} color="#fff" style={{ marginRight: 8 }} />
  <Text style={styles.signInText}>Sign in with Apple</Text>
</TouchableOpacity>
      </View>

      {/* Settings Section */}
      <View style={styles.settingsBox}>
        <Text style={styles.settingsTitle}>Settings</Text>
        <Text style={styles.settingsSubtitle}>Theme</Text>

        <View style={styles.themeOptions}>
          <TouchableOpacity style={styles.themeButton}>
            <Text style={styles.themeText}>Dark</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.themeButton}>
            <Text style={styles.themeText}>Light</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.themeButton}>
            <Text style={styles.themeText}>System</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F9FA",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 6,
    color: "#111",
  },
  subtitle: {
    fontSize: 15,
    color: "#555",
    marginBottom: 24,
  },
  buttonGroup: {
    marginBottom: 32,
  },
  signInButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  
  signInText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  settingsBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  settingsTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111",
  },
  settingsSubtitle: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 12,
    color: "#444",
  },
  themeOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  themeButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: "#f9f9f9",
  },
  themeText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
});
