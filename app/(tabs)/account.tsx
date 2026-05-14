import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useAppContext, ThemeMode } from "@/contexts/AppContext";
import { useLikedWallpapers, useSuggestedWallpapers, useLibraryWallpapers } from "@/hooks/useWallpaper";

export default function Account() {
  const { colors, theme, setTheme } = useAppContext();
  const liked     = useLikedWallpapers();
  const suggested = useSuggestedWallpapers();
  const library   = useLibraryWallpapers();

  const THEMES: { key: ThemeMode; label: string; icon: string }[] = [
    { key: "light",  label: "Light",  icon: "sunny-outline"   },
    { key: "dark",   label: "Dark",   icon: "moon-outline"    },
    { key: "system", label: "Auto",   icon: "phone-portrait-outline" },
  ];

  return (
    <ScrollView
      style={[styles.root, { backgroundColor: colors.bg }]}
      contentContainerStyle={styles.scroll}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile */}
      <View style={styles.profileSection}>
        <View style={[styles.avatar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Ionicons name="person" size={34} color={colors.textMuted} />
        </View>
        <Text style={[styles.profileTitle, { color: colors.text }]}>Welcome to Panels</Text>
        <Text style={[styles.profileSub, { color: colors.textMuted }]}>Sign in to sync your collection</Text>
      </View>

      {/* Sign-in buttons */}
      <View style={styles.authGroup}>
        <Pressable style={styles.authBtnDark}>
          <FontAwesome name="google" size={18} color="#fff" />
          <Text style={styles.authBtnDarkText}>Continue with Google</Text>
        </Pressable>
        <Pressable style={[styles.authBtnLight, { borderColor: colors.border, backgroundColor: colors.surface }]}>
          <FontAwesome name="apple" size={20} color={colors.text} />
          <Text style={[styles.authBtnLightText, { color: colors.text }]}>Continue with Apple</Text>
        </Pressable>
      </View>

      {/* Divider */}
      <View style={styles.divider}>
        <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
        <Text style={[styles.dividerText, { color: colors.textMuted }]}>or browse as guest</Text>
        <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        {[
          { label: "Suggested", value: suggested.length },
          { label: "Liked",     value: liked.length     },
          { label: "Library",   value: library.length   },
        ].map((s) => (
          <View key={s.label} style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.statValue, { color: colors.text }]}>{s.value}</Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Settings card */}
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Settings</Text>

        {/* Theme */}
        <View style={styles.settingRow}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: colors.orangeLight }]}>
              <Ionicons name="color-palette-outline" size={18} color={colors.orange} />
            </View>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Appearance</Text>
          </View>
        </View>
        <View style={styles.themeGroup}>
          {THEMES.map((t) => {
            const active = theme === t.key;
            return (
              <Pressable
                key={t.key}
                onPress={() => setTheme(t.key)}
                style={[
                  styles.themeCard,
                  { borderColor: active ? colors.orange : colors.border, backgroundColor: active ? colors.orangeLight : colors.bg },
                ]}
              >
                <Ionicons
                  name={t.icon as any}
                  size={22}
                  color={active ? colors.orange : colors.textMuted}
                />
                <Text style={[styles.themeCardText, { color: active ? colors.orange : colors.textMuted }]}>
                  {t.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Notifications */}
        <View style={[styles.settingRow, { borderTopWidth: 1, borderTopColor: colors.border, marginTop: 8, paddingTop: 16 }]}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: colors.orangeLight }]}>
              <Ionicons name="notifications-outline" size={18} color={colors.orange} />
            </View>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Notifications</Text>
          </View>
          <Text style={[styles.settingValue, { color: colors.textMuted }]}>Off</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Text style={[styles.infoText, { color: colors.textMuted }]}>Panels  ·  v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root:  { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingBottom: 120 },
  profileSection: { alignItems: "center", paddingTop: 28, paddingBottom: 24 },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    alignItems: "center", justifyContent: "center",
    marginBottom: 14, borderWidth: 1,
  },
  profileTitle: { fontSize: 22, fontFamily: "Poppins_700Bold" },
  profileSub:   { fontSize: 13, fontFamily: "Poppins_400Regular", marginTop: 2 },
  authGroup:    { gap: 10, marginBottom: 20 },
  authBtnDark: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 10, backgroundColor: "#111", paddingVertical: 15, borderRadius: 14,
  },
  authBtnDarkText: { color: "#fff", fontSize: 15, fontFamily: "Poppins_600SemiBold" },
  authBtnLight: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 10, paddingVertical: 15, borderRadius: 14, borderWidth: 1,
  },
  authBtnLightText: { fontSize: 15, fontFamily: "Poppins_600SemiBold" },
  divider: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 20 },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { fontSize: 12, fontFamily: "Poppins_400Regular" },
  statsRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  statCard: {
    flex: 1, borderRadius: 14, paddingVertical: 14,
    alignItems: "center", borderWidth: 1,
  },
  statValue: { fontSize: 22, fontFamily: "Poppins_700Bold" },
  statLabel: { fontSize: 11, fontFamily: "Poppins_500Medium", marginTop: 2 },
  card: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 12 },
  cardTitle: { fontSize: 16, fontFamily: "Poppins_700Bold", marginBottom: 12 },
  settingRow: {
    flexDirection: "row", alignItems: "center",
    justifyContent: "space-between", paddingBottom: 12,
  },
  settingLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  settingIcon: { width: 34, height: 34, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  settingLabel: { fontSize: 14, fontFamily: "Poppins_500Medium" },
  settingValue: { fontSize: 13, fontFamily: "Poppins_400Regular" },
  themeGroup: { flexDirection: "row", gap: 8, marginBottom: 4 },
  themeCard: {
    flex: 1, borderRadius: 12, borderWidth: 1.5,
    paddingVertical: 14, alignItems: "center", gap: 6,
  },
  themeCardText: { fontSize: 12, fontFamily: "Poppins_600SemiBold" },
  infoRow: { alignItems: "center", paddingVertical: 8 },
  infoText: { fontSize: 12, fontFamily: "Poppins_400Regular" },
});
