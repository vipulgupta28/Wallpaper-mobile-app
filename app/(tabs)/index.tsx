import { View, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SuggestedScreen from "../suggested";
import LikeScreen from "../liked";
import LibraryScreen from "../library";
import { useAppContext } from "@/contexts/AppContext";

const Tab = createMaterialTopTabNavigator();

export default function ForYou() {
  const { colors } = useAppContext();

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      <View style={[styles.header, { backgroundColor: colors.bg }]}>
        <Text style={[styles.brand, { color: colors.text }]}>Panels</Text>
        <Text style={[styles.tagline, { color: colors.textMuted }]}>Discover & save beautiful wallpapers</Text>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.orange,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarLabelStyle: {
            fontSize: 14,
            textTransform: "none",
            fontFamily: "Poppins_600SemiBold",
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.orange,
            height: 3,
            borderRadius: 2,
          },
          tabBarStyle: {
            backgroundColor: colors.bg,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          },
          tabBarPressColor: colors.orangeLight,
        }}
      >
        <Tab.Screen name="Suggested" component={SuggestedScreen} />
        <Tab.Screen name="Liked"     component={LikeScreen} />
        <Tab.Screen name="Library"   component={LibraryScreen} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
  },
  brand: {
    fontSize: 30,
    fontFamily: "Poppins_700Bold",
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    marginTop: 1,
  },
});
