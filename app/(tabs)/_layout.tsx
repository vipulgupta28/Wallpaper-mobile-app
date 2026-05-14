import { View, Text, Pressable, StyleSheet } from "react-native";
import { Link, Slot, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppContext } from "@/contexts/AppContext";
import { DownloadPicture } from "@/components/BottomSheet";

const TABS = [
  { href: "/",        activeIcon: "home",    inactiveIcon: "home-outline",    label: "For you"  },
  { href: "/explore", activeIcon: "compass", inactiveIcon: "compass-outline", label: "Explore"  },
  { href: "/account", activeIcon: "person",  inactiveIcon: "person-outline",  label: "Account"  },
] as const;

export default function TabLayout() {
  const pathname  = usePathname();
  const insets    = useSafeAreaInsets();
  const { colors, sheetWallpaper, closeSheet } = useAppContext();

  function isActive(href: string) {
    if (href === "/") return !pathname.includes("explore") && !pathname.includes("account");
    return pathname.includes(href.slice(1));
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      <View style={[styles.content, { paddingTop: insets.top }]}>
        <Slot />
      </View>

      {/* Floating pill nav — positioned just above the home indicator */}
      <View style={[styles.navWrapper, { bottom: insets.bottom + 8 }]}>
        <View style={[styles.pill, { backgroundColor: colors.navBg, borderColor: colors.border }]}>
          {TABS.map((tab) => {
            const active = isActive(tab.href);
            return (
              <Link key={tab.href} href={tab.href} asChild>
                <Pressable style={styles.tab}>
                  <Ionicons
                    name={(active ? tab.activeIcon : tab.inactiveIcon) as any}
                    size={22}
                    color={active ? colors.orange : colors.textMuted}
                  />
                  <Text
                    style={[
                      styles.label,
                      { color: active ? colors.orange : colors.textMuted },
                      active && styles.labelActive,
                    ]}
                  >
                    {tab.label}
                  </Text>
                </Pressable>
              </Link>
            );
          })}
        </View>
      </View>

      {/* Sheet overlay — declared after nav so it sits on top; zIndex beats elevation */}
      {sheetWallpaper && (
        <View style={styles.sheetOverlay}>
          <DownloadPicture wallpaper={sheetWallpaper} onClose={closeSheet} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  navWrapper: {
    position: "absolute",
    left: 20,
    right: 20,
    alignItems: "center",
    zIndex: 10,
    elevation: 12,
  },
  sheetOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    elevation: 100,
  },
  pill: {
    flexDirection: "row",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 12,
    width: "100%",
    justifyContent: "space-around",
    borderWidth: 1,
  },
  tab: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 3,
  },
  label: {
    fontSize: 11,
    marginTop: 3,
    fontFamily: "Poppins_500Medium",
  },
  labelActive: {
    fontFamily: "Poppins_600SemiBold",
  },
});
