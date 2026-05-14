import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useWallpapers, Wallpaper } from "@/hooks/useWallpaper";
import ImageCard from "@/components/ImageCard";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "@/contexts/AppContext";

export default function SplitView({
  wallpapers: wallpapersProp,
  emptyMessage = "Nothing here yet",
}: {
  wallpapers?: Wallpaper[];
  emptyMessage?: string;
}) {
  const allWallpapers = useWallpapers();
  const wallpapers    = wallpapersProp ?? allWallpapers;
  const { colors, openSheet } = useAppContext();

  const left  = wallpapers.filter((_, i) => i % 2 === 0);
  const right = wallpapers.filter((_, i) => i % 2 !== 0);

  if (wallpapers.length === 0) {
    return (
      <View style={[styles.empty, { backgroundColor: colors.bg }]}>
        <Ionicons name="images-outline" size={48} color={colors.border} />
        <Text style={[styles.emptyTitle, { color: colors.text }]}>{emptyMessage}</Text>
        <Text style={[styles.emptySub, { color: colors.textMuted }]}>
          Wallpapers you save will appear here
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      <View style={[styles.countBar, { borderBottomColor: colors.border }]}>
        <Text style={[styles.countText, { color: colors.textMuted }]}>
          {wallpapers.length} wallpaper{wallpapers.length !== 1 ? "s" : ""}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.grid}
      >
        <View style={styles.col}>
          {left.map((w, i) => (
            <ImageCard key={`l-${i}`} wallpaper={w} index={i * 2}     onPress={() => openSheet(w)} />
          ))}
        </View>
        <View style={styles.col}>
          {right.map((w, i) => (
            <ImageCard key={`r-${i}`} wallpaper={w} index={i * 2 + 1} onPress={() => openSheet(w)} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:     { flex: 1 },
  countBar: { paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1 },
  countText:{ fontSize: 12, fontFamily: "Poppins_500Medium" },
  grid: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 120,
    alignItems: "flex-start",
  },
  col:   { flex: 1, paddingHorizontal: 4 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", paddingBottom: 60 },
  emptyTitle: { fontSize: 16, fontFamily: "Poppins_600SemiBold", marginTop: 16 },
  emptySub:   { fontSize: 13, fontFamily: "Poppins_400Regular", marginTop: 4 },
});
