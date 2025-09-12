import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LikeScreen from "../liked";
import LibraryScreen from "../library";
import SuggestedScreen from "../suggested";

const Tab = createMaterialTopTabNavigator();

export default function ForYou() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#000", // active tab text color
        tabBarInactiveTintColor: "#888", // inactive tab text color
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
          textTransform: "none", // keep labels as typed
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#000", // underline indicator color
          height: 3,
        },
        tabBarStyle: {
          backgroundColor: "#fff", // top tab background
          elevation: 0, // remove shadow on Android
          borderBottomWidth: 1,
          borderBottomColor: "#eee",
        },
      }}
    >
      <Tab.Screen name="Suggested" component={SuggestedScreen} />
      <Tab.Screen name="Liked" component={LikeScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
    </Tab.Navigator>
  );
}
